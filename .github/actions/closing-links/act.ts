import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";
import {
  describeDecision,
  issueComment,
  planTicketCloses,
  type LinkDecision,
  type Ticket,
} from "./decisions.ts";
import { readPushEvent, type PushEvent } from "./events.ts";
import {
  collectClosingLinks,
  commitSource,
  parseSpecNumber,
  specBranch,
  type PushedCommit,
} from "./links.ts";

const run = promisify(execFile);

/**
 * Acts on the closing links a push carried: closes the Tickets whose work has
 * reached their Spec branch, and says so on each one.
 *
 * The shell around the pure modules: it reads the event GitHub handed the
 * workflow, asks GitHub what the Spec holds, and makes the writes the decisions
 * ask for. Every decision is in the pure modules; everything here is `gh` and
 * the event file.
 *
 * The comment follows the close rather than riding with it, because it says
 * that the Ticket was closed: a comment written first and a close that then
 * failed would leave an open Ticket claiming otherwise.
 */
async function main(): Promise<void> {
  const plan = await readPlan();
  if (plan === undefined) return;

  const { repository, decisions } = plan;
  const failures: string[] = [];

  /** Whether one write landed, keeping a failure rather than abandoning the rest. */
  const landed = async (
    issue: number,
    what: string,
    write: () => Promise<void>,
  ): Promise<boolean> => {
    try {
      await write();

      return true;
    } catch (cause) {
      // One Ticket that would not close is not a reason to leave its siblings
      // open: every Ticket is attempted, and the job fails at the end.
      failures.push(`#${issue}: ${what} — ${describeError(cause)}`);

      return false;
    }
  };

  for (const decision of decisions) {
    const issue = decision.link.issue;
    console.log(describeDecision(decision));

    if (decision.kind !== "close") continue;

    const closed = await landed(issue, "could not close it", () =>
      closeTicket(repository, issue),
    );

    const comment = closed ? issueComment(decision) : undefined;
    if (comment !== undefined) {
      await landed(issue, "could not comment on it", () =>
        commentOn(repository, issue, comment),
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(`${failures.length} write(s) did not land:\n${failures.join("\n")}`);
  }
}

/** What this run has to do: the repository, and what its links come to. */
type Plan = {
  /** `fmenemo/my-claude-skills`. */
  repository: string;
  decisions: LinkDecision[];
};

/**
 * What this run of the workflow has to do, or nothing when it has nothing to
 * do and has said why.
 *
 * One event carries a link this acts on: a push to a Spec branch, whose commit
 * messages name the Tickets whose work has arrived. A link that reaches the
 * default branch is GitHub's own to read, and GitHub closes what it names.
 */
async function readPlan(): Promise<Plan | undefined> {
  const path = required("GITHUB_EVENT_PATH");
  const payload: unknown = JSON.parse(await readFile(path, "utf8"));
  const name = required("GITHUB_EVENT_NAME");

  if (name !== "push") {
    throw new Error(`${name} is not an event this workflow acts on.`);
  }

  return planPush(readPushEvent(payload));
}

/** The closes a push to a Spec branch asks for. */
async function planPush(event: PushEvent): Promise<Plan | undefined> {
  const spec = parseSpecNumber(event.ref);
  if (spec === undefined) {
    // The workflow's own trigger filters on `spec/**`, so this is a branch
    // that matched the glob without being a Spec branch — `spec/spike`, say.
    console.log(`${event.ref} is not a Spec branch, so nothing closes.`);

    return undefined;
  }

  const { repository } = event;
  const links = collectClosingLinks(await readCommits(event));
  if (links.length === 0) {
    console.log(
      `No commit pushed to ${specBranch(spec)} carries a closing link, so nothing closes.`,
    );

    return undefined;
  }

  return {
    repository,
    decisions: planTicketCloses(spec, links, await readSpecTickets(repository, spec)),
  };
}

/**
 * The messages of every commit the push carried.
 *
 * A range is asked of GitHub rather than of git, so that the workflow needs no
 * history beyond the checkout it already has. `base...head` is compared from
 * the merge base, which for a push is the branch's own tip before it — for a
 * force-push, which has no such tip, is still the last point the two shared,
 * and for the push that created the branch is where it forked from the default
 * branch.
 */
async function readCommits(event: PushEvent): Promise<PushedCommit[]> {
  const { repository, defaultBranch, push } = event;
  const source = commitSource(push, defaultBranch);
  if (source.kind === "listed") return source.commits;

  const { stdout } = await run("gh", [
    "api",
    `repos/${repository}/compare/${source.base}...${source.head}?per_page=100`,
    "--paginate",
    "--jq",
    ".commits[] | {sha, message: .commit.message}",
  ]);

  return jsonLines<PushedCommit>(stdout);
}

/**
 * The Tickets the Spec holds, and whether each is still open.
 *
 * One call answers both questions the plan asks — is this issue the Spec's,
 * and is it already closed — because GitHub's sub-issues endpoint returns the
 * issues themselves.
 */
async function readSpecTickets(repository: string, spec: number): Promise<Ticket[]> {
  const { stdout } = await run("gh", [
    "api",
    `repos/${repository}/issues/${spec}/sub_issues?per_page=100`,
    "--paginate",
    "--jq",
    ".[] | {number, state}",
  ]);

  return jsonLines<Ticket>(stdout);
}

/**
 * Closes one Ticket, saying nothing yet.
 *
 * The comment comes afterwards, as its own write, so that a comment saying the
 * Ticket was closed is written only where the close landed.
 */
async function closeTicket(repository: string, issue: number): Promise<void> {
  await run("gh", ["issue", "close", String(issue), "--repo", repository]);
}

/** Says on a Ticket that it was closed, once the close has landed. */
async function commentOn(
  repository: string,
  issue: number,
  comment: string,
): Promise<void> {
  await run("gh", [
    "issue",
    "comment",
    String(issue),
    "--repo",
    repository,
    "--body",
    comment,
  ]);
}

/**
 * One object per line, which is what `gh --jq` writes.
 *
 * Asked for a line at a time rather than as one array because `--paginate`
 * writes a second array after the first, and two arrays are not JSON.
 */
function jsonLines<T>(stdout: string): T[] {
  return stdout
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as T);
}

function required(variable: string): string {
  const value = process.env[variable];
  if (value === undefined || value === "") {
    throw new Error(`${variable} is not set, so there is no event to read.`);
  }

  return value;
}

/** `gh`'s own complaint, which says more than the exit code does. */
function describeError(cause: unknown): string {
  const { stderr, message } = (cause ?? {}) as { stderr?: string; message?: string };

  return stderr?.trim() || message || String(cause);
}

await main();
