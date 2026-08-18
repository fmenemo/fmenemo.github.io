import { specBranch, type ClosingLink } from "./links.ts";

/** One Ticket a Spec holds, and whether it is still open. */
export type Ticket = {
  number: number;
  state: "open" | "closed";
};

/**
 * A push to `spec/<the Spec's issue number>`, which is where a link closes.
 *
 * The Spec's number and nothing beside it: a Spec branch is the only place this
 * acts, since a link reaching the default branch is GitHub's own to read.
 */
export type SpecBranchLanding = { spec: number };

/**
 * What a closing link comes to, read against the Spec branch it landed on.
 *
 * Three outcomes and no fourth: the link closes a Ticket, names an issue that
 * is not the Spec's to close, or names a Ticket that closed already. Every one
 * of them is reported, because a link that did nothing is the case a reader
 * needs told about.
 *
 * The landing rides along, so that a decision is the whole of what a log line
 * and a comment are written from.
 */
export type LinkDecision = {
  kind: "close" | "already-closed" | "not-a-ticket-of-this-spec";
  link: ClosingLink;
  landing: SpecBranchLanding;
};

/**
 * What a push to a Spec branch closes.
 *
 * The Spec's Tickets are the whole of the judgement. GitHub's own closing
 * keywords fire only on the default branch, so this does there what GitHub
 * will not — and the one thing it must not do is more than GitHub would. A
 * link naming an issue the Spec does not hold is left open: a parentless
 * Ticket closes when its own Ticket pull request merges into the default
 * branch, and closing it from a Spec branch would say the work had arrived
 * somewhere it has not.
 *
 * A Ticket that is already closed is a decision too, not a no-op to skip
 * quietly. It is what a re-pushed or rebased Spec branch looks like, and a
 * workflow that failed on it would fail on the ordinary case.
 */
export function planTicketCloses(
  spec: number,
  links: readonly ClosingLink[],
  tickets: readonly Ticket[],
): LinkDecision[] {
  const landing: SpecBranchLanding = { spec };
  const held = new Map(tickets.map((ticket) => [ticket.number, ticket.state]));

  return links.map((link) => {
    const state = held.get(link.issue);
    if (state === undefined) {
      return { kind: "not-a-ticket-of-this-spec", link, landing };
    }
    if (state === "closed") return { kind: "already-closed", link, landing };

    return { kind: "close", link, landing };
  });
}

/** One line for the workflow's log, naming the issue and what became of it. */
export function describeDecision(decision: LinkDecision): string {
  const { link } = decision;

  switch (decision.kind) {
    case "close":
      return `#${link.issue}: closing — ${carries(decision)}.`;
    case "already-closed":
      return `#${link.issue}: nothing to do — ${carries(decision)}, but #${link.issue} is already closed.`;
    case "not-a-ticket-of-this-spec":
      return `#${link.issue}: left open — ${carries(decision)}, but #${link.issue} is not a sub-issue of #${decision.landing.spec}. Only a Spec's own Ticket closes on a push to its Spec branch; a parentless Ticket closes when its own pull request merges into the default branch.`;
  }
}

/**
 * The comment a Ticket carries away from this, or nothing where this workflow
 * closed nothing.
 *
 * A close is what there is to say, so a close is what gets a comment: a Ticket
 * an earlier push closed and an issue this declined to touch are both left as
 * they are, and their reasons are in the log beside the run that made them. So
 * pushing the same commits twice leaves no second trace.
 */
export function issueComment(decision: LinkDecision): string | undefined {
  if (decision.kind !== "close") return undefined;

  // A paragraph to a line however long the line: GitHub renders a single
  // newline in a comment as a line break, so prose wrapped the way this
  // repository wraps its documents arrives on the issue with ragged edges.
  return [
    "**Closed by a workflow, not by hand.**",
    `${opens(decision)}, so this Ticket's work has reached the Spec branch. It reaches the default branch when #${decision.landing.spec}'s pull request merges.`,
    `_Written by the \`${ACTION}\` action, which ${DOES}. It read the link; it made no judgement about whether the work is done._`,
  ].join("\n\n");
}

/**
 * What signs the comment.
 *
 * The action rather than the workflow that ran it: the workflow is the few
 * lines each repository holds and may name anything, where the action is the
 * one thing every close was made by, and the place to go and read what it does.
 */
const ACTION = "closing-links";

/** What the action is for, as the comment it signs says it. */
const DOES =
  "does on a Spec branch what GitHub's own closing keywords do only on the default branch";

/**
 * What arrived and where, opening a sentence.
 *
 * A log line reads it mid-sentence and a comment starts a paragraph with it. It
 * starts with a backticked branch name, which has no case to change and needs
 * none.
 */
function opens(decision: LinkDecision): string {
  const said = carries(decision);

  return said.charAt(0).toUpperCase() + said.slice(1);
}

/** What arrived and where, which is the whole of what either message says. */
function carries(decision: LinkDecision): string {
  const { link, landing } = decision;

  return `\`${specBranch(landing.spec)}\` now carries ${link.sha}, whose message reads \`${link.keyword} #${link.issue}\``;
}
