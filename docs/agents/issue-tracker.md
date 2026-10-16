# Issue tracker: GitHub

Issues and specs (you may know a spec as a PRD) for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --json number,title,body,labels,comments`.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Make an issue a sub-issue of a parent**: `gh issue create --parent <parent> ...`, or `gh issue edit <parent> --add-sub-issue <child>` afterwards (`gh` 2.94+). Older `gh`: `gh api --method POST repos/<owner>/<repo>/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>` (database id, as in **Blocking** below). Without sub-issues, put `Part of #<parent>` at the top of the child body.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh api --paginate 'repos/{owner}/{repo}/pulls?state=open' --jq '.[] | select(.author_association | IN("OWNER","MEMBER","COLLABORATOR") | not) | {number, title, author: .user.login, author_association, labels: [.labels[].name]}'`.
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either — resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Read it as in **Read an issue** above.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (see **Make an issue a sub-issue of a parent**). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** — the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed. The same native dependencies relate a Ticket to its blockers outside `/wayfinder` too — see "What the closing workflow needs of a Ticket" below.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.

## What Sandcastle needs of this repository

> Written by `/setup-sandcastle` on 2026-10-16: this section, and any sentence
> above redirected to it. The rest of this file belongs to the mattpocock setup,
> and a later run of that setup overwrites both, visibly, because this note is
> here to be found.

`/sandcastle-run` reads two axes off this table, and a repository that records
neither is run as `github` on both.

| Axis         | This repository   |
| ------------ | ----------------- |
| **Tracking** | `github`          |
| **Hosting**  | `github`          |

**Tracking** is `github` where Specs and Tickets are this repository's GitHub
issues, and `files` where they are markdown files in this repository.
**Hosting** is `github` where work lands through pull requests on this
repository's GitHub remote, and `none` where it lands by a local merge into the
default branch. The two are independent, and this repository's row is the one
answer to each: a repository is set up again to change either.

Every sandbox a `/sandcastle-run` run spawns is given four keys. The harness
stamps them on every sandbox, and it is the one place they are set:

- `SANDCASTLE_RUN=1`, which says that this shell is a run's and nothing more.
- `VITEST_MAX_WORKERS`, the most Vitest workers that sandbox may run.
- `SANDCASTLE_WORKERS`, the same number under the harness's own name.
- `SANDCASTLE_SLOT`, a number counting from zero, distinct from that of every
  other sandbox alive at the same time.

The case they exist for is a worker cap: a run works several Tickets at once on
one machine, one sandbox each, so tooling that sizes itself to the machine (a
test runner taking a worker per core) takes the whole machine once per sandbox,
and the sandboxes fight over it. Vitest is capped from the harness with nothing
asked of this repository: it reads `VITEST_MAX_WORKERS` off its own environment
and takes it over any `maxWorkers` a configuration here names, so inside a run
the Run's number is the cap whatever that configuration says, and outside one
Vitest runs as it always did. Where `SANDCASTLE_RUN` is set, Playwright, Jest
and anything else that takes a number and reads no environment read the number
from `SANDCASTLE_WORKERS` rather than choosing one of their own. A configuration
here that hardcodes a port can add `SANDCASTLE_SLOT` to a base of its own and
give each sandbox a port no sibling is holding. Tooling that reads nothing is
unaffected.

### What the closing workflow needs of a Ticket

A Spec is a container issue, worked through its Tickets. What relates the two is
GitHub's own features rather than anything written in a body. Both calls below
take the issue's numeric **database id**,
`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, and neither takes the
`#number` the issue is known by, nor its `node_id`.

- **Parentage**: a Ticket is one of GitHub's sub-issues of its Spec. Make the
  link with
  `gh api --method POST repos/<owner>/<repo>/issues/<spec>/sub_issues -F sub_issue_id=<ticket-db-id>`,
  and list a Spec's children with
  `gh api repos/<owner>/<repo>/issues/<spec>/sub_issues --jq '[.[] | {number, state, title}]'`.
- **Blocking**: a Ticket blocked by another is one of GitHub's native issue
  dependencies. Add an edge with
  `gh api --method POST repos/<owner>/<repo>/issues/<blocked>/dependencies/blocked_by -F issue_id=<blocker-db-id>`.
  GitHub then reports open blockers under
  `issue_dependencies_summary.blocked_by`.

`/to-tickets` writes `## Parent` into each Ticket's body as prose, and a
`## Blocked by` section only where it set no native edge. A Ticket whose
blockers are native edges need not carry a `## Blocked by` section. The prose is
what a reader of the Ticket sees; the native relations are what
`/sandcastle-run` queries to order its work and what the workflow below reads to
decide a Ticket is its to close. A relation that exists only in prose relates
nothing to a machine.

Making the sub-issue link is a write on the parent's `sub_issues` endpoint, so it
reads at first as forbidden by `/to-tickets`'s instruction to modify no parent
issue. The narrower reading binds: link the Tickets, and leave the Spec's own
body and labels alone.

**The workflow on a Spec's branch closes a Ticket only where GitHub says that
Ticket is a sub-issue of the Spec the branch is named for.** A missing link does
not degrade to the prose: the Ticket stays open, the workflow's log says it is
not a sub-issue of that Spec, and somebody closes it by hand. A whole Spec's
Tickets can be filed with both prose sections written and neither relation made,
and the first sign of it is a push to the Spec's branch that closes nothing.

### What an acceptance criterion may ask for

A Ticket's acceptance criteria are what a `/sandcastle-run` review judges the
work against, and two rules keep them judgeable.

**A criterion is decidable from the branch alone.** A reviewer judges it by
reading the commit on the branch and running what this repository defines, in
the worktree, with the run's own token, and nothing outside the commit counts.
So a criterion may not require a pull request body, a comment on the tracker, an
issue on another repository, a signature, a signed-in session, or a person's own
verdict: none of those is on the branch, and an implementer handed one either
fails it or goes looking for a credential the run never gave it. A visual check
counts only where the artefact it judges is in the tree: a rendering the commit
produces can be judged, a page on a live site cannot.

**A checkbox holds one assertion.** A box bundling clauses is met in part, which
is a gap on the whole box and a retry of the whole criterion; one assertion to a
box makes a gap one clause and its fix one change. Where a criterion wants to
say two things, it is two boxes.

`/sandcastle-run` reads every criterion of every Ticket in a run's set before
any sandbox exists, and refuses the run where one carries a criterion that
cannot be met from the branch, naming each Ticket and criterion with its reason.
Three shapes are refused: a criterion needing something outside the commit, one
contradicting another criterion of the same Ticket, and one no finite check
shows met. A checkbox bundling clauses can still be met, so it is not refused.
Rewrite the body and run `/sandcastle-run` again.
