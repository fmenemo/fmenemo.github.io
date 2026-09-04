# Ticket #37, what an agent could do and what waits on Fran

#37 is the gate #16 never had. Four criteria, and three of them start at a
verdict only Fran can give: he flips through the five variants on the dev
server and says which design gets built, one variant or a combination named
across variants, and that verdict with its reasoning goes on #26. The Ticket
says so itself: "This is Fran's step. An agent may prepare the branch and the
pointer once the verdict is posted, but the verdict itself is his."

As of this branch there is no comment on #26. `gh issue view 26 --comments`
returns none. So this is what was prepared and what is still owed.

## Done: the prototype is captured on a throwaway branch

`prototype/26-five-variants`, pushed to `origin` on 2026-09-04 at commit
9721f2f3. It is `main` (a1da909e) plus the prototype delta and nothing else:
the five variants, the switcher, the `main.tsx` dev-only entry, the stylesheet,
the four `@fontsource-variable` dev dependencies, and a `PROTOTYPE.md` at the
root that says what the branch is, how to run it, which search parameter
selects which variant, and why none of it reaches a production build.

Out of `main` rather than out of `spec/26` on purpose. A reader who checks the
branch out gets the five variants standing against the design they were drawn
to replace, and the diff against `main` is the prototype alone rather than the
prototype plus whatever else the Spec branch has accumulated.

It was verified where it stands, not only where it was written: in a worktree
on `prototype/26-five-variants`, `npm install`, `tsc -b`, `vite build` and
`vitest run` all pass, 217 tests, and no variant string appears anywhere in
`dist/`. The `import.meta.env.DEV` guard holds out of `main` as well.

The branch name says what it is without a lookup, and the Ticket asks that a
reader know it is the prototype behind #26: `prototype/` marks it throwaway,
`26` names the Spec, `five-variants` names the contents.

## Owed, and Fran's to give

**Criterion 1 — Fran has looked at all five variants in both themes and at
phone width on the dev server.** No agent can meet this. `npm run dev`, then
`?variant=a` through `?variant=e`; the switcher's arrow keys cycle them and the
theme toggle is in the masthead. #32 through #36 each left four screenshots
under `.scratch/redesign/ticket-3N-rendered-checks/`, light and dark at 1280
and 320, if the still images help before the live pass.

**Criterion 2 — a comment on #26 names the chosen variant or the combination,
and says why.** Fran's. Nothing an agent writes is a verdict, and a comment an
agent posts under `GH_TOKEN` saying what Fran picked would be an agent deciding
the design.

**Criterion 3 — second half, #26 carries a pointer to the branch beside the
verdict.** Held deliberately. The branch exists and is pushed, so the pointer
is one comment away, but the Ticket grants an agent the pointer "once the
verdict is posted" and there is no verdict to put it beside. The text is ready
below; whoever posts the verdict can paste it under the same comment.

**Criterion 4 — phase two tickets filed on #26 from the verdict, the first of
them removing the prototype from the Spec branch.** These are written *from*
the verdict. What they say depends on which variant, or which combination of
parts across variants, Fran names, so there is nothing to file until he names
it. The one ticket whose shape is known regardless is the first: it removes
`src/prototype/` and the `main.tsx` dev branch from `spec/26`, and the four
`@fontsource-variable` dev dependencies with them, leaving the chosen design
as the only design on the Spec branch. It still should not be filed before the
verdict, because it is the first of a breakdown the verdict writes.

## The pointer text, ready to post on #26

> The prototype these five variants were drawn on is captured on
> `prototype/26-five-variants`, out of `main` and not merged anywhere:
> <https://github.com/fmenemo/fmenemo.github.io/tree/prototype/26-five-variants>
>
> It is `main` plus the prototype and nothing else. `PROTOTYPE.md` at the root
> says how to run it and which `?variant=` parameter selects which of the five.
> The Spec branch keeps the prototype only until the first phase-two ticket
> removes it; this branch is where it survives afterwards.
