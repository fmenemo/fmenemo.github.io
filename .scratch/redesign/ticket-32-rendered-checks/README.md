# Ticket #32, what was checked in a browser

The prototype has no tests of its own by decision, so everything below was read
off the running dev server (`npm run dev`, Chrome, 2026-09-04) rather than
asserted. The four screenshots beside this file are variant A as it stood at the
commit that added them.

| File | Viewport | Theme | Pixels |
| --- | --- | --- | --- |
| `variant-a-light-1280.png` | 1280 | light | 2560 x 13472 |
| `variant-a-dark-1280.png` | 1280 | dark | 2560 x 13472 |
| `variant-a-light-320.png` | 320 | light | 320 x 10356 |
| `variant-a-dark-320.png` | 320 | dark | 320 x 10356 |

Each is one continuous capture of the whole document, and the pixel height of
each is the page's own height at that width, which is what says so. The two
320px captures are taken at a device pixel ratio of 1 rather than 2 for that
reason: at 2 the image is 20712px tall, Chrome's full-page capture cannot hold
it, and what comes back restarts at the masthead partway down, so everything
below independent work is lost. The first pair of 320px captures on this branch
had that fault and these replace them.

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
- Both arrows and both arrow keys cycle, and both directions wrap: from `a`,
  left goes to `e` and right from `e` returns to `a`. Each step rewrites the
  URL. The register carries all five of #26's keys from the start for exactly
  this reason, so the cycle is observable on the dev server before the second
  variant exists; `b` to `e` show a flat "This variant is not built yet." page
  in the switcher's own voice, and #33 to #37 replace their entry with a drawn
  variant.
- With an `<input>` focused, and again with a `contenteditable` element
  focused, neither arrow key moved the variant.
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
