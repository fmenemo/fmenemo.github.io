# Ticket 42 rendered checks

What jsdom cannot see for the running head and the identification block: the
faces, the width axis, two themes, 320px, the sticky head, the hover, focus and
pressed states, and reduced motion.

Chrome 152 headless shell over `npm run dev`, 1280x900 and an emulated 320x900
at DPR 2, the theme set through the same `localStorage` key the pre-paint script
reads and confirmed as the class on `<html>` before each shot.

## Whole pages

Four per edition, because the Spanish edition is a document of its own rather
than a mode of the English one (ADR 0004): a combination checked on one is not
checked on the other.

| File | What it is |
| --- | --- |
| `en-light-1280.png` | English, light, 1280px |
| `en-dark-1280.png` | English, dark, 1280px |
| `en-light-320.png` | English, light, 320px |
| `en-dark-320.png` | English, dark, 320px |
| `es-light-1280.png` | Spanish, light, 1280px |
| `es-dark-1280.png` | Spanish, dark, 1280px |
| `es-light-320.png` | Spanish, light, 320px |
| `es-dark-320.png` | Spanish, dark, 320px |

A whole page at 320px is 20,000px tall, which reduces the identification block
to a smear. The `-320-top.png` four are the first viewport of the same four
320px pages, which is where this ticket's work is.

| File | What it is |
| --- | --- |
| `en-light-320-top.png` | English, light, 320px, first viewport |
| `en-dark-320-top.png` | English, dark, 320px, first viewport |
| `es-light-320-top.png` | Spanish, light, 320px, first viewport |
| `es-dark-320-top.png` | Spanish, dark, 320px, first viewport |

## States

| File | What it is |
| --- | --- |
| `en-light-1280-skip-link.png` | The skip link on the first Tab, drawn over the running head |
| `en-light-1280-focus-theme.png` | The focus ring on the theme control, with the rule drawn under it |
| `en-light-1280-hover-cv.png` | The CV block filled with the accent under a pointer |
| `en-light-1280-hover-index.png` | The rule drawn across a hovered contents-index row |
| `en-light-1280-scrolled.png` | The running head still at the top edge, 1600px down the page: the whole 1280x900 viewport, over the Principal role's evidence |

The scrolled shot is the whole viewport rather than a clip. A `clip` is measured
against the document, so clipping the top of a scrolled page photographs the top
of the page and not what the visitor is looking at — which is how the first pass
of this shot came out showing the nameplate and no running head at all.

## Measured out of the live page

Every combination above:

- `scrollWidth === clientWidth` and no element's box crosses the right edge, so
  no horizontal scroll at 320px or 1280px.
- The running head computes to `position: sticky`, and its top is 0 after
  scrolling 1600px.
- The name's `scrollWidth` exceeds its `clientWidth` at 320px and not at
  1280px: it truncates rather than wraps, and only where it has to.
- The hand computes to `font-stretch: 82%` and the nameplate to `112%` — a live
  axis, not a fallback.
- The identity line's rule runs 168px to 1112px at 1280px; the fields column
  starts at 168px and the contents index ends at 1112px, so the rule lines up
  with the grid under it, which is the verdict's one correction to variant E.

Keyboard, English edition:

- The first Tab lands on "Skip to content"; following it sets the fragment to
  `#main` and moves focus to the `main` element.
- The third Tab lands on the theme control, which reads "Switch to dark mode"
  in light and "Switch to light mode" in dark.

## Where this is recorded

These checks are recorded on the ticket as the criterion asks, at
<https://github.com/fmenemo/fmenemo.github.io/issues/42#issuecomment-5551730838>.
The pointer is here so that the record is reachable from the branch rather than
only from GitHub.

## Not photographed, and why

The press and reduced motion. A headless connection can click but cannot hold a
button down across a screenshot, and it offers no reduced-motion switch. Both
are held instead by the compiled stylesheet, `dist/assets/App-*.css`:

- `.link-rule:hover,.link-rule:focus-visible,.link-rule:active{background-size:100% 1px}`
  — a finger draws the rule a pointer draws, with no hover to precede it. The
  contents index rows and the theme control both wear it.
- `active\:bg-accent:active`, `active\:text-stock:active`,
  `active\:translate-y-px:active` — what the CV block wears under a press.
- `@media (prefers-reduced-motion:reduce){ ... .link-rule{transition:none} }`,
  unlayered so it outranks the utility. The rule still appears whole; it does
  not travel.
