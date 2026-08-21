/**
 * One commit a push carried, as GitHub's push event names it.
 *
 * The message and the commit it was written in, and nothing else: what closes
 * a Ticket is what someone wrote in the message, never who pushed it or when.
 */
export type PushedCommit = {
  /** The full forty-character object name, as the event carries it. */
  sha: string;
  message: string;
};

/** A commit message asking for an issue to close, and where it asked. */
export type ClosingLink = {
  /** The commit whose message carried it. */
  sha: string;
  /** The keyword as it was written, e.g. `Closes` — the comment quotes it back. */
  keyword: string;
  /** The issue the link names. */
  issue: number;
};

/**
 * The nine words GitHub closes an issue on, lower-cased.
 *
 * Ours are GitHub's because a commit message is written once and read twice:
 * by GitHub when the work reaches the default branch, and by this workflow
 * when it reaches a Spec branch. A tenth keyword here would close a Ticket on
 * the Spec branch and leave the same message closing nothing on the default
 * branch, which is the one difference nobody would think to check for.
 *
 * The Home repository's harness holds the same nine, because it writes the
 * links this reads. It holds its own copy rather than importing this one: what
 * an action publishes is what a consumer runs, and a consumer runs none of the
 * harness. A guard there reads both copies whole — these words, the matching
 * rule and the commit shape above — and fails where they have drifted.
 */
export const CLOSING_KEYWORDS = [
  "close",
  "closes",
  "closed",
  "fix",
  "fixes",
  "fixed",
  "resolve",
  "resolves",
  "resolved",
] as const;

/**
 * One grammar a closing link is read in: the words it may be written in.
 *
 * The words and nothing else. The separator, the `#` and the word boundaries
 * are the same whichever words a grammar holds, which is why they are in the
 * matching rule below rather than here.
 *
 * The harness has a second grammar, the one a file Ticket closes on, and a
 * field naming the word each grammar writes a link in. Both belong to writing a
 * link, and this action only reads one: a repository whose Tickets are files
 * installs no workflow to close them, and a workflow that read `Settles #44` as
 * a close would close whichever issue happened to be #44. So what is here is
 * GitHub's grammar alone, which is the whole of what a consumer runs
 * (ADR-0017).
 */
export type LinkGrammar = {
  /** Every word this grammar closes a Ticket on, lower-cased. */
  keywords: readonly string[];
};

/** GitHub's own grammar, which a Ticket that is a GitHub issue closes on. */
export const GITHUB_GRAMMAR: LinkGrammar = {
  keywords: CLOSING_KEYWORDS,
};

/**
 * How a closing link is written: a keyword, then a separator, then `#` and a
 * number.
 *
 * The separator is a colon or a space: the merge agent writes this as a trailer
 * and a hand-worked commit writes it as a sentence, and both spellings mean the
 * same thing. `Closes#50` is not one of them, which is what GitHub does with it
 * too. Each end of the keyword is a word boundary, so `unclosed #50` closes
 * nothing — and one keyword covers one number, so `Closes #50, #51` leaves #51
 * alone.
 *
 * The grammar and the number are the caller's, because the two sides of
 * ADR-0017 ask for different ones: this asks GitHub's grammar for any number,
 * where the harness asks after one issue it already wrote a link for, in the
 * grammar the Run's tracker calls for. The rest is the matching rule, and the
 * rule is what both sides have to spell the same way — `boundary.test.ts` reads
 * this declaration beside the harness's and fails where the two have drifted.
 */
function closingLinkPattern(grammar: LinkGrammar, issue: string): string {
  return String.raw`\b(${grammar.keywords.join("|")})\b(?::[ \t]*|[ \t]+)#(${issue})`;
}

/** `Closes #50`, and the trailer form `Closes: #50`, however capitalised. */
const CLOSING_LINK = new RegExp(
  closingLinkPattern(GITHUB_GRAMMAR, String.raw`\d+`),
  "gi",
);

/**
 * `spec/37` — a Spec branch, and the number of the Spec it is named for.
 *
 * Anchored end to end: `spec/37/fixup` is a branch below a Spec branch rather
 * than the branch itself, and its pushes are somebody's work in progress. A
 * leading zero is refused because `spec/0037` is not the branch the Spec's
 * number names, and reading it as one would close Tickets from a branch the
 * Skill will never find again.
 */
const SPEC_BRANCH = /^(?:refs\/heads\/)?spec\/([1-9]\d*)$/;

/** The branch a Spec's Tickets merge into, named by number. */
export function specBranch(spec: number): string {
  return `spec/${spec}`;
}

/**
 * The Spec a ref is the branch of, or nothing when the ref is not a Spec
 * branch.
 *
 * Reads the ref a push carries — `refs/heads/spec/37` — and the bare branch
 * name alike. The workflow's own trigger already filters on `spec/**`, so this
 * is the second reading rather than the first: it is what turns a glob that a
 * branch called `spec/rebuild-the-skill` also matches into the one number the
 * parentage check needs.
 */
export function parseSpecNumber(ref: string): number | undefined {
  const number = SPEC_BRANCH.exec(ref)?.[1];

  return number === undefined ? undefined : Number(number);
}

/** Every closing link one commit message carries, in the order it wrote them. */
export function parseClosingLinks(commit: PushedCommit): ClosingLink[] {
  return [...commit.message.matchAll(CLOSING_LINK)].map(
    ([, keyword = "", issue = ""]) => ({
      sha: commit.sha,
      keyword,
      issue: Number(issue),
    }),
  );
}

/** The push GitHub is running a workflow for, as its event describes it. */
export type Push = {
  /** The branch's tip before the push, or forty zeroes when it was created. */
  before: string;
  /** Its tip after, or forty zeroes when the branch was deleted. */
  after: string;
  created: boolean;
  deleted: boolean;
  /** The commits the event listed, which GitHub stops listing at twenty. */
  commits: PushedCommit[];
};

/** Where a push's commit messages have to be read from. */
export type CommitSource =
  | { kind: "listed"; commits: PushedCommit[] }
  /** A comparison GitHub answers: two object names, or a branch and one. */
  | { kind: "range"; base: string; head: string };

/** Forty zeroes: what GitHub sends for the end of a range that has none. */
const NO_COMMIT = "0".repeat(40);

/**
 * Where to read the commit messages of a push.
 *
 * The event's own list stops at twenty commits, and twenty is not a safe
 * ceiling here: a Run merges a whole Wave's branches into the Spec branch and
 * pushes once, so the merge commits carrying the closing links are the last
 * ones to arrive and the first ones the cap would drop. Every push that could
 * carry work is therefore read as a range, which GitHub answers in full.
 *
 * That has to include the push that created the branch, which is the one most
 * likely to be over the cap: a Spec's first Run does the whole Spec before it
 * pushes anything. It has no tip before it to range from, so the range is taken
 * from the default branch — a Spec branch is forked from it, so the comparison
 * answers what the branch added, and nothing when the fork carried no work of
 * its own. A branch sharing no history with the default branch has no
 * comparison to answer, and the workflow fails saying so rather than closing
 * whichever Tickets fit under the cap.
 *
 * A deleted branch has no head, and an event that lists nothing asks for
 * nothing.
 */
export function commitSource(push: Push, defaultBranch: string): CommitSource {
  if (push.deleted || push.after === NO_COMMIT) {
    return { kind: "listed", commits: push.commits };
  }
  if (push.created || push.before === NO_COMMIT) {
    return { kind: "range", base: defaultBranch, head: push.after };
  }

  return { kind: "range", base: push.before, head: push.after };
}

/**
 * Every closing link a push carried, one per issue.
 *
 * A push is several commits, and a Spec branch's pushes are merges: two of
 * them naming the same Ticket is a rebase or a retried merge, not two closes.
 * The first link wins, because the commit that first said the work had arrived
 * is the commit the Ticket's comment should point a reader at.
 */
export function collectClosingLinks(
  commits: readonly PushedCommit[],
): ClosingLink[] {
  const seen = new Set<number>();

  return commits.flatMap(parseClosingLinks).filter((link) => {
    if (seen.has(link.issue)) return false;
    seen.add(link.issue);

    return true;
  });
}
