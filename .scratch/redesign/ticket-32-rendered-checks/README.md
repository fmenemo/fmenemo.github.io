# Ticket #32, what was checked in a browser

The prototype has no tests of its own by decision, so everything below was read
off the running dev server (`npm run dev`, Chrome, 2026-09-04) rather than
asserted. The four screenshots beside this file are variant A as it stood at the
commit that added them.

| File | Viewport | Theme |
| --- | --- | --- |
| `variant-a-light-1280.png` | 1280 | light |
| `variant-a-dark-1280.png` | 1280 | dark |
| `variant-a-light-320.png` | 320 | light |
| `variant-a-dark-320.png` | 320 | dark |

They are here and not on the ticket because a Sandcastle sandbox writes to the
tracker with `GH_TOKEN` and GitHub has no API route that uploads an image to an
issue: attachments are a web-UI upload. Posting them is the driving session's to
do, from this directory.

## The route and the switcher

- `/` renders today's site. No switcher, no serif, no prototype stylesheet: the
  dynamic import never runs, so nothing of the prototype loads.
- `/?variant=a` renders variant A whole, with the bar at the bottom reading
  `A / Editorial`.
- `/?variant=z` renders variant A and rewrites the URL to `?variant=a`, so an
  unknown key lands on a page rather than on nothing.
- Reloading `/?variant=a` comes back to variant A.
- Both arrows and both arrow keys cycle. With one variant registered the cycle
  is a fixed point, so this was checked with a second stub variant registered
  temporarily: `a` right to `b`, right again wraps to `a`, left from `a` wraps
  to `b`, and each step rewrote the URL. The stub was removed afterwards; what
  is committed registers variant A alone, and #33 to #37 add theirs to the same
  list.
- With an `<input>` focused, neither arrow key moved the variant.
- No console errors or warnings on either page.

## Variant A

- 320px: `document.documentElement.scrollWidth` is 320 and no element's right
  edge passes the viewport, in both themes.
- 1280px: the document holds a 54rem column, and the prose inside it a 66ch
  measure.
- Both themes are drawn from their own tokens rather than inverted, and the page
  follows the class the pre-paint script sets, so it opens in the theme the
  visitor arrived in.
- Every date, span and recognition date sits in the same right-aligned rail, so
  the numbers line up down the page.
- The focus ring is the site's, recoloured to the variant's accent; it is
  visible on every link and on both controls.
- Reduced motion: the one entrance animation is cancelled by a
  `prefers-reduced-motion: reduce` block in the prototype's own stylesheet, and
  by the site's global block above it. Both rules were read back out of
  `document.styleSheets` on the running page.

## The production build

`npm run build` on this branch produces a `dist/` that is byte-for-byte the
`dist/` built from `main` at `a1da909e`: `diff -rq` over the two trees reports
no difference at all. Neither the switcher, nor variant A, nor Newsreader, nor a
single `ed-` class name is in the built JavaScript, CSS or HTML.
