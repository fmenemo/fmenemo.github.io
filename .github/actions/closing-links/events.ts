import type { Push } from "./links.ts";

/**
 * A push, as much of it as the closes need.
 *
 * Read from the event file rather than from git, because the workflow's
 * checkout is a shallow one and the branch's own history is not what decides
 * anything here — the push is.
 */
export type PushEvent = {
  /** `refs/heads/spec/37`. */
  ref: string;
  /** `fmenemo/my-claude-skills`. */
  repository: string;
  /** The branch a Spec branch forked from, e.g. `main` — its first push ranges against it. */
  defaultBranch: string;
  push: Push;
};

/**
 * The push GitHub is running the workflow for.
 *
 * What is asked of the payload is what is used, and a payload missing any of it
 * is refused rather than read as an empty push: a workflow that treated a
 * malformed event as "nothing to close" would close nothing and say so, which
 * is indistinguishable from working.
 */
export function readPushEvent(payload: unknown): PushEvent {
  const { ref, before, after, created, deleted, repository, commits } = shape(payload) as {
    ref?: unknown;
    before?: unknown;
    after?: unknown;
    created?: unknown;
    deleted?: unknown;
    repository?: { full_name?: unknown; default_branch?: unknown };
    commits?: { id?: unknown; message?: unknown }[];
  };

  if (
    typeof ref !== "string" ||
    typeof before !== "string" ||
    typeof after !== "string" ||
    typeof repository?.full_name !== "string" ||
    typeof repository.default_branch !== "string"
  ) {
    throw new Error("The event file does not hold a push event.");
  }

  return {
    ref,
    repository: repository.full_name,
    defaultBranch: repository.default_branch,
    push: {
      before,
      after,
      created: created === true,
      deleted: deleted === true,
      commits: (commits ?? []).flatMap((commit) =>
        typeof commit.id === "string" && typeof commit.message === "string"
          ? [{ sha: commit.id, message: commit.message }]
          : [],
      ),
    },
  };
}

/**
 * An object to read the fields off, whatever the payload turned out to be.
 *
 * A payload that is not an object at all reads as one with no fields, so the
 * refusal comes from the same check as a payload missing one field, and says
 * the same thing.
 */
function shape(payload: unknown): Record<string, unknown> {
  return typeof payload === "object" && payload !== null
    ? (payload as Record<string, unknown>)
    : {};
}
