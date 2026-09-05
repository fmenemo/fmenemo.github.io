# Phase two, the slots the verdict fills

#37's fourth criterion asks for phase-two tickets filed on #26 from the
verdict. One is filed: #40, which removes the prototype from `spec/26`. The
rest build the chosen design, and each one's content is read off a verdict that
does not exist yet, so this file is the skeleton rather than the tickets.

It exists so the `/to-tickets` pass over the verdict is a filling-in rather
than a fresh carve, and so a reader of this branch can see exactly how much of
phase two the missing verdict is holding.

## Why these tickets are not filed

A ticket that says "build the hero" without saying which hero is a ticket an
implementer cannot start and a gate cannot review. The verdict is what supplies
the design; filing the ticket first would mean an agent inventing it, which is
what #37 exists to prevent. #40 was fileable because its scope — take the
prototype off the Spec branch — is the same whichever variant wins.

## The slots

The site's structure is the carve, because that is what a variant restructures.
Each slot below becomes one ticket when the verdict says what goes in it, and
the verdict's "why" is what each ticket's acceptance criteria are written
against.

1. **Remove the prototype from the Spec branch.** Filed as #40, blocked by #37.
   First, so nothing after it is built beside five competing designs.
2. **Tokens and type.** The palette, the faces and the scale the chosen design
   sets, in `src/index.css` and the design tokens ADR 0002 keeps them in. First
   of the build, because every slot below wears them.
3. **The masthead and the hero.** `Navbar.tsx`, `LanguageSelector.tsx` and
   `Home.tsx`. Carries the theme control, whose form the chosen variant decides.
4. **The evidence.** `Experience.tsx` and `IndependentWork.tsx`, including how
   the nested Shop programme reads. The largest slot, and the one a recruiter
   came for.
5. **Recognitions, education and technologies.** `Recognitions.tsx` and
   `Technologies.tsx`, whether or not the chosen design keeps them as separate
   bands.
6. **Contact and the footer.** `Contact.tsx` and `Footer.tsx`.
7. **The Spanish edition.** ADR 0004 gives `/es` its own source of truth, so
   every piece of new chrome above needs its Spanish counterpart. A slot rather
   than a step inside each ticket, because the edition is checked as a whole.
8. **The share images and the 404.** `tools/assets/render.sh` re-renders both
   share images against the new type, and the branded 404 follows the same
   palette.

The order is a dependency order, not a wave plan: 2 gates everything, 7 and 8
follow whatever 3 to 6 settle on.

## What every one of them inherits

These hold whichever variant wins, and were the shared bounds on #32 to #36:

- All content survives. Every evidence bullet including sub-bullets, every
  recognition, the technologies, education, the identity line, location and
  mode, the CV downloads and the routes.
- No imagery of any kind.
- Both themes, drawn rather than inverted, through the existing root class and
  the pre-paint script.
- Motion yields to reduced-motion.
- The stack is fixed: React, Tailwind v4 tokens, Vite, one page per edition, no
  new runtime dependency. A face is a self-hosted subset, not a CDN link.
- Finished at 320px with no horizontal scroll, and at 1280px.
- Section anchors survive, so a link someone already holds still lands.
- `npm run build`, `npm run lint` and `npm test` pass.

## What the verdict changes

Everything else: which structure each slot takes, which type and palette, how
the nesting reads, what the masthead lists, whether a section folds into
another. A combination verdict — "the hero from B with the experience list from
D" — cuts across slots 3 and 4 and is why the verdict names parts against
variants rather than naming one winner.
