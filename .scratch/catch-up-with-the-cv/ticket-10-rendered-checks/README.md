# Ticket 10: the two English entries, read together on the page

One of the ticket's acceptance criteria is a check that cannot be a test. It
asks that the two independent-work entries read clearly together and that
Instagram Checker's cross-reference be looked at *rendered*, because what makes
a reference ambiguous is what a reader's eye lands on next, and no assertion
holds that. It was done, and this is what it found. The record is here so that a
reader of the branch does not have to take a commit message's word for it.

Nothing reads this file and no test fails when it goes stale, the same footing
as `.scratch/english-figures-against-the-render.md`.

## What was read

The production build of this branch at `f53b2805`, served by `vite preview` and
opened in Chromium. Not the dev server and not the test's jsdom: the criterion
is about the page a visitor gets.

Three viewports, both editions:

- `independent-work-1280px.png` — the English section whole, at 1280px.
- `independent-work-500px.png` — the same section at 500px, the narrowest the
  browser window would go on this machine. 390px was wanted and could not be
  had; the single-column layout is already in force at 500px, so what this
  shows is the wrap, not the breakpoint.
- `independent-work-es-1280px.png` — the Spanish section at 1280px, one entry.
- `principal-agentic-bullet-1280px.png` — the bullet Instagram Checker's
  "the work above" points at, in the section overhead.

## The cross-reference still resolves

Instagram Checker opens "Built end to end with the same agentic workflow as the
work above". The harness sits **below** it, so what is above Instagram Checker
on the rendered page is still the experience section, and the bullet that
sentence means is still the nearest thing overhead. That is the whole reason for
the order, and it is the reason a later entry should not be inserted before it.

Read as a picture rather than as a claim about the DOM: at 1280px the section
label and the two paragraphs sit in one viewport, and the eye travelling up from
"the work above" leaves the section entirely and lands on the Principal role.
Nothing between the two competes for the reference.

There is one residual reading, and it is worth writing down rather than fixing.
A reader who takes both entries in at once could hear "the same agentic
workflow" as naming the harness described directly beneath. It is the weaker
reading — the phrase points up, not down, and "the work above" is a section
reference — but it is available now in a way it was not when the section held
one entry. #10 asked that this be raised rather than reworded silently, because
Instagram Checker's copy was separately approved. It is raised. Nothing on this
branch changes it.

For what it is worth, the bullet as it renders on this branch still reads
"Built the team's agentic AI development workflow". That is the team-attribution
overclaim #4 corrects, and it belongs to another ticket. It is noted here only
so that a reader comparing this screenshot against a later one is not surprised.

## The two entries read as two entries

At 1280px the section is 458px tall over a 672px measure. Instagram Checker
runs 3 lines, the harness 5, separated by 24px of space and nothing else — no
rule, no bullet, no card. The bold name at the head of each paragraph is the
boundary a reader sees, and it is enough: the eye lands on two things.

At 500px the same two run 5 and 7 lines over a 452px measure, 591px in total,
with the same 24px between them. Nothing overflows the viewport at either width.

The harness is the longer of the two and reads as the heavier entry, which is
the right way round: it is the one carrying the hero's claim.

## The Spanish edition did not move

`independent-work-es-1280px.png` shows one entry, Instagram Checker, in Spanish,
with no link. `src/content.es.ts` is untouched on this branch — `git diff` names
three files and that is not one of them. The screenshot is here because "still
exactly one" is easier to believe seen than argued.

## No entry is a link

Neither section contains an anchor, in either edition. That part *is* asserted,
in `src/App.test.tsx`, so it does not rest on this file. It was confirmed on the
page anyway while the page was open.
