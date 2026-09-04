# Ticket #34, what was checked in a browser

The prototype has no tests of its own by decision, so everything below was read
off the running dev server (`npm run dev`, headless Chrome 152 over the DevTools
protocol, 2026-09-04) rather than asserted. The four screenshots beside this
file are variant C as it stood at the commit that added them.

| File | Viewport | Theme | Pixels |
| --- | --- | --- | --- |
| `variant-c-light-1280.png` | 1280 | light | 1280 x 11142 |
| `variant-c-dark-1280.png` | 1280 | dark | 1280 x 11142 |
| `variant-c-light-320.png` | 320 | light | 320 x 13613 |
| `variant-c-dark-320.png` | 320 | dark | 320 x 13613 |

Each is one continuous capture of the whole document, from the nameplate to the
footer, and each pixel height is the page's own height at that width. All four
are taken at a device pixel ratio of 1, this variant's pages being taller than
variant A's: at 2 the 1280px capture is 22284px tall, which is past what
Chrome's full-page capture can hold, and what comes back restarts partway down.
#32 lost everything below independent work that way once already.

The record of them, the table above and everything read beside them, is on the
ticket: comment `5543023408` on #34, posted under `GH_TOKEN`, which also carries
the line saying what makes this variant structurally different from variant A.
The four image files are not on it and cannot be. GitHub's issue attachments are
a web-UI upload against a browser session; there is no REST or GraphQL route
that uploads an image to an issue or a comment, so `GH_TOKEN` cannot post one
however it is spelled. Dragging the four files from this directory into that
comment is the one step left, and it needs a browser someone is signed into.

## What makes variant C structurally different from variant A

This section is the source of the line on the ticket; the two say the same
thing, and a change to one belongs in the other.

Variant A is a set document: one 54rem column centred in the window, a variable
serif, hairline rules, and a right-aligned margin rail that every date and
figure hangs on. Variant C has no column. Every block runs edge to edge inside
one page gutter; the divisions are 2px and 4px rules rather than hairlines; the
type is one compressed grotesque set in caps at sizes that break the line; the
numbers hang at the left as a running count of the record rather than at the
right as dates; and the Shop programme, which A sets as a passage between two
hairlines, is here a full-bleed field of orange with its nine parts numbered
and ruled — the one area of colour on the page and the same in both themes.

The two also disagree about where things go. A carries the CV twice, in the hero
and again in Contact, and reaches Fran from both ends of the page; C states the
download once, as a bar under the identity line, and keeps every route to Fran
in Contact alone. A's section order is Experience, Independent work,
Recognitions, Technologies, Contact; C runs Experience, Independent work,
Technologies, Recognitions, Contact, and folds education into the end of
Recognitions as the one block on the page drawn in reverse.

## The variant on the switcher

- `/?variant=c` renders variant C whole, with the bar at the bottom reading
  `C / Bold and raw`.
- From `?variant=b`, one right arrow key lands on `c` and rewrites the URL;
  another goes on to `d`, and a left arrow comes back to `c`.
- No console errors or warnings on the page.

## Variant C

- **Content.** Every one of the 99 strings the English edition declares —
  identity line, location and mode, every employer, span, location, role title
  and role date, every evidence bullet, all nine Shop sub-bullets, both
  independent-work entries, all seven recognitions, education in full, all
  fourteen technologies, both language labels, the CV label and every chrome
  label — was read back out of the rendered page and matched, at 1280px and
  again at 320px. Nothing is dropped. The only strings that do not appear
  verbatim are the recognitions, whose trailing `(May 2017)` is drawn as a date
  at the right of its row without the source string's parentheses; both halves
  were matched separately. Variant A draws them the same way.
- **No imagery.** `img`, `svg`, `picture`, `video` and `canvas` count zero on the
  page, and no element on it resolves a `background-image` other than `none`.
- **320px.** `document.documentElement.scrollWidth` is 320 in both themes. The
  only elements whose right edge passes the viewport are the technologies inside
  the ticker, which is `overflow: hidden` and clips them; the document does not
  scroll sideways.
- **Both themes.** Light is a white ground with near-black ink; dark is drawn
  rather than inverted — the ground goes to the near-black the ink was and the
  ink to a warm bone, and the education block reverses within each. The accent
  is one value, `#ff3d00`, in both. The page follows the class the pre-paint
  script sets.
- **Reduced motion.** Under `prefers-reduced-motion: reduce`, read off the
  running page: the nameplate's entrance resolves to `animation-name: none`, the
  ticker to `animation-name: none` with `flex-wrap: wrap`, and its second copy
  to `display: none`, so the technologies stand still as a plain wrapped row
  rather than as a stopped strip missing its right half.
- **Anchors.** All five links in the index resolve to a section on the page:
  `#experience`, `#independent-work`, `#technologies`, `#recognitions`,
  `#contact`.
- **Focus.** Tabbing from the top of the document lands on the language link,
  the theme control, the CV bar and the first index link in turn, each with a
  visible `solid 3px` ring. The ring is the variant's accent everywhere except
  on the CV bar, which is itself a field of that accent and takes a near-black
  ring instead.
- **Pre-flight.** No eyebrow anywhere: the section numbers sit inline on the
  heading's own baseline rather than as a label above it. One CTA intent and one
  label for it, stated once. No split header. No locale or time strip. No
  version footer. No row of three equal cards — there are no cards.

## A note on what may be written in this directory

Tailwind's source detection sweeps the whole project, and `.scratch` is neither
ignored nor excluded the way `src/prototype` is, so a bare word in prose here
that happens to be a utility name is compiled into the stylesheet the site
ships. The first draft of this file used one of Tailwind's font-variant-numeric
utility names as an ordinary English word, and that alone changed `dist`. It is
reworded above. The general fix, an `@source not` for this directory in
`src/index.css`, is not made here: it also drops the utilities that the existing
files in `.scratch` are contributing to `main` today, which is a change to the
shipped stylesheet and belongs to a ticket that is about the build.

## The production build

`npm run build` on this branch produces a `dist/` that is byte-for-byte the
`dist/` built from `ff33c553`, the branch point: `diff -rq` over the two trees
reports no difference at all. Neither the switcher, nor any variant, nor
Archivo, nor a single `br-` class name is in the built JavaScript, CSS or HTML.
