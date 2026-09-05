# Ticket #36, what was checked in a browser

The prototype has no tests of its own by decision, so everything below was read
off the running dev server (`npm run dev`, headless Chrome over the DevTools
protocol, 2026-09-04) rather than asserted. The four screenshots beside this
file are variant E as it stood at the commit that added them.

| File | Viewport | Theme | Pixels |
| --- | --- | --- | --- |
| `variant-e-light-1280.png` | 1280 | light | 1280 x 4967 |
| `variant-e-dark-1280.png` | 1280 | dark | 1280 x 4967 |
| `variant-e-light-320.png` | 320 | light | 320 x 9313 |
| `variant-e-dark-320.png` | 320 | dark | 320 x 9313 |

Each is one continuous capture of the whole document, and the pixel height of
each is the page's own height at that width, which is what says so: the nameplate
appears once, at the top, and the footer is the last thing in the file.

All four are taken at a device pixel ratio of 1, for the reason #32 recorded: a
capture past what Chrome's full-page screenshot can hold comes back restarting
at the top of the page partway down, and everything below the restart is lost.
The first 1280 pair on this branch had that fault — taken at a ratio of 2 and
scaled a second time in the capture, they came back 5120 x 19868 and restarted
immediately after the third recognition, so recognitions 4 to 7, education,
technologies, contact and the footer were missing from both. These replace them,
and the whole document is in each.

The Ticket asks for these four to be named in a comment on #36, and they are:
`gh issue comment 36` under `GH_TOKEN` posted the table above on 2026-09-04, at
<https://github.com/fmenemo/fmenemo.github.io/issues/36#issuecomment-5544703733>.
The token writes comments on this repository without trouble.

What the token cannot do is *attach* the files, which the criterion does not ask
for. That was tried rather than assumed, on 2026-09-04:

| Attempt | Answer |
| --- | --- |
| `gh api user --jq .login` | `fmenemo`, so the token authenticates and the repository is its own |
| `gh api -X POST repos/fmenemo/fmenemo.github.io/issues/36/attachments` | HTTP 404, the route does not exist |
| `gh api -X POST repos/fmenemo/fmenemo.github.io/issues/36/assets` | HTTP 404, the route does not exist |
| every mutation on the GraphQL schema whose name contains `upload`, `attach`, `asset` or `image` | there are none |

Issue attachments are a web-UI upload, made by a browser session against an
endpoint the REST and GraphQL APIs do not expose. The routes that would put an
image behind a URL a comment could render are all outside what this Ticket asks
for: a release asset needs a release published on the repository, and a raw or
Pages URL needs the file pushed to a branch. A Run does not push, and neither is
this Ticket's work, so neither was done. Dragging the four files onto the issue
stays a human step, and a separate one from naming them.

## The route and the switcher

- `/?variant=e` renders variant E whole, with the bar at the bottom reading
  `E / The record`.
- Reloading `/?variant=e` comes back to variant E.
- The arrow keys cycle and wrap: from `e`, right goes to `a` and on to `b`, and
  left from `a` returns to `e`. Each step rewrites the URL.
- `/` renders today's site: no switcher, no Archivo, no `rc-` class on any node,
  and the body still set in Inter. The dynamic import never runs.
- No console errors or warnings on either page.

## Variant E

- 320px: `document.documentElement.scrollWidth` is 320 and no element's right
  edge passes the viewport, in both themes.
- 1280px: the document holds a 72rem column and the evidence a 74ch measure.
- Both themes are drawn from their own tokens rather than inverted: light is a
  manila stock (`#f4f1e9`) under a warm brown hand (`#7a4a10`), dark a slate
  (`#121316`) under amber (`#d9a441`). The page follows the class the pre-paint
  script sets, so it opens in the theme the visitor arrived in.
- Every figure on the page is tabular and lining, and every date, span and
  recognition date sits in the same left column, so the numbers read down.
- Content: all 107 strings of the English edition — every bullet, every
  sub-bullet, every recognition and its date, the technologies, education, the
  identity line, location, mode, the CV download, the routes and every chrome
  label the variant uses — were read back out of `document.body.innerText` and
  matched against `src/content.en.ts`. Nothing is missing.
- No imagery: the page draws with type, rules and colour only. There is no
  `img`, no SVG, no background image and no gradient.
- Reduced motion: under `prefers-reduced-motion: reduce` no element has a
  running animation and the one transition on the page, the rule drawn under a
  link, reports a duration of `1e-05s`, which is the site stylesheet's own
  flattening; the prototype stylesheet cancels it a second time on its own
  terms.
- The focus ring is the site's, recoloured to the variant's accent.
- Mechanical pre-flight: no eyebrow anywhere (the running heads are the section
  headings and carry their own numbers), one CTA intent and one label for it
  ("Download CV", once, in the identification block), no split header, no locale
  or time strip, no version footer, and no cards at all, equal or otherwise.

## The production build

`npm run build` on this branch produces a `dist/` that is byte-for-byte the
`dist/` built from `HEAD` before this work, which is `main` at the merge of #32:
`diff -rq` over the two trees reports no difference at all. Neither the
switcher, nor any variant, nor Archivo, nor a single `rc-` class name is in the
built JavaScript, CSS or HTML.
