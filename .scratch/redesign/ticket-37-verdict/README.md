# Ticket #37, what an agent could do and what waits on Fran

#37 is the gate #16 never had. Four criteria, and two of them are Fran's own
act: he flips through the five variants on the dev server and says which design
gets built, one variant or a combination named across variants, and that verdict
with its reasoning goes on #26. The Ticket says so itself: "This is Fran's step.
An agent may prepare the branch and the pointer once the verdict is posted, but
the verdict itself is his."

As of this branch there is still no verdict on #26. What follows is what an
agent could carry across the line anyway, and what genuinely cannot move until
Fran acts.

## Criterion 3, both halves: done

**The branch.** `prototype/26-five-variants`, pushed to `origin` on 2026-09-04
at commit 9721f2f3. It is `main` (a1da909e) plus the prototype delta and nothing
else: the five variants, the switcher, the `main.tsx` dev-only entry, the
stylesheet, the four `@fontsource-variable` dev dependencies, and a
`PROTOTYPE.md` at the root that says what the branch is, how to run it, which
search parameter selects which variant, and why none of it reaches a production
build.

Out of `main` rather than out of `spec/26` on purpose. A reader who checks the
branch out gets the five variants standing against the design they were drawn to
replace, and the diff against `main` is the prototype alone rather than the
prototype plus whatever else the Spec branch has accumulated.

It was verified where it stands, not only where it was written: in a worktree on
`prototype/26-five-variants`, `npm install`, `tsc -b`, `vite build` and
`vitest run` all pass, 217 tests, and no variant string appears anywhere in
`dist/`. The `import.meta.env.DEV` guard holds out of `main` as well.

**The pointer.** Posted on #26 on 2026-09-04, at
<https://github.com/fmenemo/fmenemo.github.io/issues/26#issuecomment-5544940357>.
It gives the branch URL, the table of which `?variant=` selects which of the
five, and the fact that `spec/26` keeps the prototype only until #40 removes it.

The first pass on this Ticket held the pointer back rather than posting it,
reading the Ticket's "an agent may prepare the branch and the pointer once the
verdict is posted" as a bar on posting before the verdict. The review read the
criterion the other way and was right to: the criterion is that #26 carries a
route to the prototype, and an issue with no route to it fails that however good
the reason. A pointer is a fact about where a branch is, not a claim about which
design won, so nothing in it is Fran's decision made for him. It sits on the
issue now, and the verdict will land beside it.

## Criterion 4: the first phase-two ticket is filed, the rest wait

**#40, "Phase two, first: remove the prototype from the Spec branch."** Filed as
a sub-issue of #26, blocked by #37 through GitHub's native dependency, labelled
`ready-for-agent`. It takes `src/prototype/` off `spec/26` along with the
`main.tsx` DEV branch, the stylesheet import and the four `@fontsource-variable`
dev dependencies, and builds none of the chosen design.

Its scope is the one part of phase two the verdict does not change: whichever
variant or combination Fran names, the prototype comes off the Spec branch, and
the criterion names this ticket specifically as the first of them. The
`blocked_by` edge on #37 is what keeps it from running early — until #37 closes,
the prototype on `spec/26` is the thing Fran is looking at, and removing it
would take the gate away before it had run.

**The rest of phase two is not filed, and cannot be.** Those tickets build the
chosen design. What they say — which hero, which experience list, which type,
which of the five each part comes from — is read off a verdict that does not
exist. Filing them now would mean an agent inventing the design choice and
writing tickets against it, which is the one thing #37 exists to prevent. They
are owed the moment the verdict is on #26, and they are a `/to-tickets` pass
over it.

## Criteria 1 and 2: no agent can meet these

**Criterion 1 — Fran has looked at all five variants in both themes and at phone
width on the dev server.** The criterion is Fran's eyes on the running page.
Nothing an agent commits, runs or writes down is that. `npm run dev`, then
`?variant=a` through `?variant=e`; the switcher's arrow keys cycle them and the
theme toggle is in the masthead. #32 through #36 each left four screenshots
under `.scratch/redesign/ticket-3N-rendered-checks/`, light and dark at 1280 and
320, if the still images help before the live pass.

**Criterion 2 — a comment on #26 names the chosen variant or the combination,
and says why.** Fran's. This is not a token denial and not a missing route:
`gh issue comment 26` works under `GH_TOKEN`, which is how the pointer above got
posted. It is that a comment written by an agent claiming which design won would
be an agent choosing the design, and the Ticket reserves the choice to Fran in
as many words. The Run declines to write it rather than being unable to.

Both stay unmet until Fran does them. Neither is a Gap a retry can close.
