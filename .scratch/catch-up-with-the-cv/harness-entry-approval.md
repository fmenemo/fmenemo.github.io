# Harness entry approval: the second independent-work entry

Gate for the one string in #10 that is new copy. **This is the only item on this
branch that needs a signature**, and until it has one the ticket stays
`ready-for-human`.

Everything else the pass ships is either approved in
`.scratch/bullets-against-the-reworked-cv/bullet-approval.md` or taken verbatim
from `cv/en.md` at `36eab4d`. This one is neither: it is a condensation of a CV
paragraph roughly three times the length of the site's existing entry, written
for this site. Under the convention the sweep record above sets out, an agent
prepares the diff and a person signs it.

## What is being signed

One entry, in `src/content.en.ts`, second in `independentWork`.

**Name:** Multi-agent delivery harness

**Description:**

> Built and run solo: it derives the order work runs in from a tracker's own
> dependency edges, scheduling in parallel whatever nothing blocks. An
> independent review answers in a schema the harness parses, and that parsed
> verdict gates the merge; a finding returns to the session that wrote the code
> as a bounded retry rather than a rewrite.

This is the draft in #10 and in #4, word for word. Nothing was rewritten,
tightened or added on the way into the file, so signing it is a yes or a no on
the ticket's own sentence rather than on a variant of it.

## What it deliberately leaves out

- **No link.** There is nothing to visit. The harness is not a product, and #10
  says in as many words that it should not acquire one.
- **No figure.** The CV paragraph carries none, and ADR 0001 makes the CV the
  source of truth: a number invented here would be a claim the CV does not make.
- **No dependency name.** Naming what it is built on would make it a tool
  someone else's tool runs, which is not the claim.
- **The typed transition stream**, and **the per-role model and effort
  routing.** Both are in the CV paragraph and both need a sentence each to mean
  anything. Two sentences would make this entry longer than the section.

## Why it is worded the way it is

It leads on architecture — dependency-derived ordering, a parsed verdict gating
a merge, a bounded retry — rather than on the fact that AI is involved. That is
the whole distance between this entry and someone who has used a coding
assistant, and it is the evidence the hero's "multi-agent delivery system" needs
standing under it, per CONTEXT.md's rule that a claim with nothing behind it
gets removed on sight.

## How it renders

Read on the page before it was offered for signature:
`ticket-10-rendered-checks/`. It sits second, so Instagram Checker's "the work
above" still points at the experience section. The record also raises the one
residual reading it introduces, which #10 asked be raised rather than reworded.

## Signature

Mark one, then fill in the two lines under it. A comment on #10 saying the same
thing counts and is the easier version for a review gate to find, but the boxes
below are the record either way.

- [ ] **Approved** — ships as written.
- [ ] **Changed** — ships with the edit written below.
- [ ] **Cut** — the entry does not ship, and #10 loses its reason to exist.

Signed by:
Date:

## Where the ask has got to

Open. Nothing below is a signature, and an agent ticking a box above would not
be one either — the point of the convention is that a person did it.

- **2026-08-21** — the entry landed in `src/content.en.ts` at `f53b2805`, drawn
  word for word from the draft in #10, and the copy was put to Fran for a yes or
  no in the session that wrote it. No reply.
- **2026-08-21** — a review gate read the branch, found the signature missing,
  and sent it back. This file was written, the copy was put again, and an
  attempt to post it to #10 failed: `gh issue comment` returns `GraphQL:
  Resource not accessible by personal access token (addComment)`. The token this
  repo's agents run under reads issues and cannot write to them, which is why
  the tracker shows no comment asking for the signature. Recorded at `bc888399`.
- **2026-08-21** — read again, sent back again on the same criterion, correctly.
  Third time of asking. Still open.

There is no further agent move here, and the ticket is `ready-for-human` for
exactly this reason. What unblocks it is Fran replying **approved**, **changed**
or **cut**, in the session or on #10. Everything else #10 asks for is done and
is recorded beside this file.
