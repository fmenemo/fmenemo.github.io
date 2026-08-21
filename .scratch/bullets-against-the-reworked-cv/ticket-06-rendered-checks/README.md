# Ticket 06: the two checks that had to be done by eye

Two of the ticket's acceptance criteria cannot be met by a test, because both of
them are checks against something rendered. They were done, and this is what
they found. The record is here so that a reader of the branch does not have to
take a commit message's word for it.

## Every figure that ships was read on the rendered CV page

ADR 0001 says why: the CV's text layer was extracted against embedded subset
fonts, and some ligature glyphs and digits did not survive. `pdftotext` output
is not evidence for a figure. The pages have to be rendered and read.

The document read was `~/Projects/professional-record/cv/shipped/Fran_Menendez_CV.pdf`,
SHA-256 `61493cbb6aeee2e6a8a91178e5f9e64fc857f66bd6479db94557e07212553b31`. That
is the build the spec (#4) names as the current one, and it is not the file this
site publishes yet: `public/Fran_Menendez_CV.pdf` is still `a7c2d837...`, the
stale build that ticket #12 replaces. Its pages were rendered to images and read
as pictures.

Two figures ship with this ticket, both inside C3, and both were read on page 1
in the second bullet of the Principal Software Engineer role:

- **about 90% of throughput.** The page reads "the strongest matches served
  automatically - about 90% of throughput, with no human review".
- **p95 under 50ms.** The page reads "p95 query latency stayed under 50ms across
  100,000+ products."

`100,000+` was already on the site and already in the figures guard, so this
ticket adds nothing to it, but it was read on the same line as the other two.

The sign-on bullet carries "five products" and "five separate logins", which are
counts inside a sentence taken whole rather than figures attached to a claim.
They were read on the same page, in the bullet immediately above session
continuity, which is also where the ticket asks the site to put it.

## The Principal entry still reads as a list rather than a wall

Checked in a browser at 1280px wide, against the dev server, after the edits.
The entry holds twelve bullets and the list is 951px tall. Measured line counts,
in order: 3, 4, 4, 2, 5, 2, 3, 3, 3, 2, 3, 2.

The longest is the security bullet at five lines, and the two bullets this
ticket lengthened sit apart rather than next to each other. Every bullet is
separated by a rule and its own space, so the eye still lands on twelve things
rather than on one block. It is the longest entry on the page and it should be,
and I would not want a thirteenth without cutting something.

- `principal-entry-top.png` starts at the role heading and runs to the caching
  bullet, so it is the one that shows the twelve as an entry under a title.
- `principal-entry-bottom.png` runs from semantic matching to the root-cause
  bullet, eleven of the twelve in one viewport, with unified sign-on sitting
  directly above session continuity near the foot of it.

## The hero, at the width where it is least forgiving

Not a criterion, but the identity line was rewritten to close the gap about
attributing the agentic workflow to the team, and a longer line in the hero is
the one thing #4 asked to see rendered before it ships.

- `hero-390px.png`, at 390px wide. The line wraps to five lines, nothing
  overflows, and the name above it keeps its two-line shape.
