# Issue tracker: GitHub

Issues and specs (you may know a spec as a PRD) for this repo live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`
- **Apply / remove labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

Infer the repo from `git remote -v` — `gh` does this automatically when run inside a clone.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

When set to `yes`, PRs run through the same labels and states as issues, using the `gh pr` equivalents:

- **Read a PR**: `gh pr view <number> --comments` and `gh pr diff <number>` for the diff.
- **List external PRs for triage**: `gh pr list --state open --json number,title,body,labels,author,authorAssociation,comments` then keep only `authorAssociation` of `CONTRIBUTOR`, `FIRST_TIME_CONTRIBUTOR`, or `NONE` (drop `OWNER`/`MEMBER`/`COLLABORATOR`).
- **Comment / label / close**: `gh pr comment`, `gh pr edit --add-label`/`--remove-label`, `gh pr close`.

GitHub shares one number space across issues and PRs, so a bare `#42` may be either — resolve with `gh pr view 42` and fall back to `gh issue view 42`.

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Notes / Decisions-so-far / Fog body. `gh issue create --label wayfinder:map`.
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`). Once claimed, the ticket is assigned to the driving dev.
- **Blocking**: GitHub's **native issue dependencies** — the canonical, UI-visible representation. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, _not_ the `#number` or `node_id`). GitHub reports `issue_dependencies_summary.blocked_by` (open blockers only — the live gate). Where dependencies aren't available, fall back to a `Blocked by: #<n>, #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed. The same native dependencies relate a Ticket to its blockers outside `/wayfinder` too — see "What the closing workflow needs of a Ticket" below.
- **Frontier query**: list the map's open children (`gh issue list --state open`, scoped to the map's sub-issues / task list), drop any with an open blocker (`issue_dependencies_summary.blocked_by > 0`, or an open issue in the `Blocked by` line) or an assignee; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` — the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.

## What the closing workflow needs of a Ticket

> Written by `/setup-sandcastle` on 2026-08-19: this section, and any sentence
> above redirected to it. The rest of this file belongs to the mattpocock setup,
> and a later run of that setup overwrites both — visibly, because this note is
> here to be found.

A Spec is a container issue, worked through its Tickets. What relates the two is
GitHub's own features rather than anything written in a body. Both calls below
take the issue's numeric **database id** —
`gh api repos/<owner>/<repo>/issues/<n> --jq .id` — and neither takes the
`#number` the issue is known by, nor its `node_id`.

- **Parentage** — a Ticket is one of GitHub's sub-issues of its Spec. Make the
  link with
  `gh api --method POST repos/<owner>/<repo>/issues/<spec>/sub_issues -F sub_issue_id=<ticket-db-id>`,
  and list a Spec's children with
  `gh api repos/<owner>/<repo>/issues/<spec>/sub_issues --jq '[.[] | {number, state, title}]'`.
- **Blocking** — a Ticket blocked by another is one of GitHub's native issue
  dependencies. Add an edge with
  `gh api --method POST repos/<owner>/<repo>/issues/<blocked>/dependencies/blocked_by -F issue_id=<blocker-db-id>`.
  GitHub then reports open blockers under
  `issue_dependencies_summary.blocked_by`.

`/to-tickets` also writes `## Parent` and `## Blocked by` into each Ticket's body
as prose. Keep both halves. The prose is what a reader of the Ticket sees; the
native relations are what a Run queries to order its Waves and what the workflow
below reads to decide a Ticket is its to close. A relation that exists only in
prose relates nothing to a machine.

Making the sub-issue link is a write on the parent's `sub_issues` endpoint, so it
reads at first as forbidden by `/to-tickets`'s instruction to modify no parent
issue. The narrower reading binds: link the Tickets, and leave the Spec's own
body and labels alone.

**The workflow on a Spec branch closes a Ticket only where GitHub says that
Ticket is a sub-issue of the Spec the branch is named for.** A missing link does
not degrade to the prose: the Ticket stays open, the workflow's log says it is
not a sub-issue of that Spec, and somebody closes it by hand. A whole Spec's
Tickets can be filed with both prose sections written and neither relation made,
and the first sign of it is a push to the Spec branch that closes nothing.
