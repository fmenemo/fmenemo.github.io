# Ticket #37: what is done, and what is Fran's

#37 is the gate #16 never had. Fran looks at the five variants on the dev
server and says which design gets built; that verdict goes on #26; the
prototype is captured; phase two is written from the verdict. The Ticket
reserves the middle of that to him in as many words: "This is Fran's step. An
agent may prepare the branch and the pointer once the verdict is posted, but
the verdict itself is his."

**As of this branch there is no verdict.** Every comment on #26 and on #32 to
#36 was posted by an agent under `GH_TOKEN`, which posts as `fmenemo`; none of
them names a chosen design. Three of the four criteria wait on that.

## Criterion 3: met, both halves

**The branch.** `prototype/26-five-variants`, pushed to `origin` at 9721f2f3.
`main` (a1da909e) plus the prototype delta and nothing else: the five variants,
the switcher, the `main.tsx` dev-only entry, the stylesheet, the four
`@fontsource-variable` dev dependencies, and a root `PROTOTYPE.md`.

Out of `main` rather than `spec/26` on purpose. The diff against `main` is the
prototype alone, and a reader who checks it out sees the five variants standing
against the design they were drawn to replace.

Verified where it stands, not only where it was written: in a worktree on that
branch, `npm install`, `tsc -b`, `vite build` and `vitest run` all pass, 217
tests, and no variant string appears anywhere in `dist/`.

**The pointer.** On #26 at
<https://github.com/fmenemo/fmenemo.github.io/issues/26#issuecomment-5544940357>.

The first pass on this Ticket withheld the pointer, reading "an agent may
prepare the branch and the pointer once the verdict is posted" as a bar on
posting one first. The review read the criterion by its outcome — does #26
carry a route to the prototype — and was right to. A pointer says where a
branch is; it decides nothing about which design won.

## Criterion 4: one ticket filed, the rest are the verdict's

#40, "Phase two, first: remove the prototype from the Spec branch", is a
sub-issue of #26, blocked by #37 through GitHub's native dependency, and
`ready-for-agent`. The dependency is what stops it running while the prototype
is still the thing Fran is looking at.

The tickets that build the chosen design are unfiled, because each one's
content is read off the verdict. [`phase-two-breakdown.md`](phase-two-breakdown.md)
is the skeleton they fill: the slots, their order, what every one of them
inherits whichever variant wins, and what only the verdict decides.

## Criteria 1 and 2: no agent can meet these

Not a token denial. `gh issue comment 26` works under `GH_TOKEN` — that is how
the pointer got posted. These are declined, not blocked.

**Criterion 1** is Fran's eyes on the running page. Nothing an agent commits,
runs or writes down is that. [`viewing-pass.md`](viewing-pass.md) is the pass
itself: the command, the twenty views in the order that makes them two sweeps,
and the reason the deployed site can never show them.

**Criterion 2** is the verdict. A comment written by an agent claiming which
design won would be an agent choosing the design.
[`verdict-form.md`](verdict-form.md) is where it goes and what it has to carry.

Both stay unmet until Fran acts. Neither is a Gap a retry can close, and this
is the third Run to say so.
