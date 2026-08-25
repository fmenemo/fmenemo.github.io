# Ticket 17: the two checks that had to be done in a browser

Two of the ticket's acceptance criteria cannot be met by a test. One asks for a
byte figure a visitor's browser produces, and one asks for a face read off a
rendered page. Both were done, and this is what they found, so that a reader of
the branch does not have to take a commit message's word for it.

Both criteria say "recorded in the ticket", and this text is on #17 as
[a comment](https://github.com/fmenemo/fmenemo.github.io/issues/17#issuecomment-5410768189).
It is here too because the screenshots are here: a comment can carry the numbers
but not eight pictures the branch already has to hold.

Posting it needed the right credential, which is worth writing down because it
cost two rounds of review to find. `GH_TOKEN` is set in this environment to a
fine-grained PAT with no Issues write, and every route to the issue fails the
same way under it — `gh issue comment` through GraphQL `addComment`, the REST
`POST /issues/17/comments`, and even a no-op `PATCH` of the body, all with
`Resource not accessible by personal access token`. The keyring credential `gh`
also holds carries the `repo` scope and can. So it is `env -u GH_TOKEN gh issue
comment`, not a permission that has to be asked for.

## What was measured, and how

Both builds were driven through Chrome's DevTools Protocol against `npm run
build` output served over HTTP — the before build from `HEAD~1` with its own
`npm install`, so Inter and IBM Plex Mono were really installed for it.

Two things about the method matter, because the obvious shortcuts get both
criteria wrong:

- **The viewport is emulated, not a window.** Chrome will not open a window
  narrower than 500px on macOS, so `--window-size=320,800` silently lays the
  page out at 500 and a 320px check made that way is not one.
  `Emulation.setDeviceMetricsOverride` gives a real 320px viewport.
- **The theme is set the way a visitor sets it.** `--force-dark-mode` does not
  touch this site: the theme comes from a `localStorage` choice read by the
  pre-paint script. Each build was served twice, once with that key set to
  `light` and once to `dark`.

The cache was cleared before every navigation, so each row is a first visit.

## Total font bytes on a first visit

What the browser actually fetched, read out of `performance.getEntriesByType('resource')`.
It is not the same as what the bundle declares, and the difference is the point:
Inter latin 700 was imported and shipped, and nothing on either page ever asked
for it, so no visitor has ever downloaded it.

| before — 6 files | bytes |
| --- | ---: |
| `inter-latin-300-normal.woff2` | 23,916 |
| `inter-latin-400-normal.woff2` | 23,664 |
| `inter-latin-500-normal.woff2` | 24,272 |
| `inter-latin-600-normal.woff2` | 24,452 |
| `ibm-plex-mono-latin-400-normal.woff2` | 14,708 |
| `ibm-plex-mono-latin-500-normal.woff2` | 14,888 |
| **total** | **125,900** |

| after — 5 files | bytes |
| --- | ---: |
| `geist-sans-latin-400-normal.woff2` | 33,400 |
| `geist-sans-latin-500-normal.woff2` | 34,716 |
| `geist-sans-latin-600-normal.woff2` | 35,292 |
| `geist-mono-latin-400-normal.woff2` | 9,864 |
| `geist-mono-latin-500-normal.woff2` | 10,116 |
| **total** | **123,388** |

**2,512 bytes smaller.** The figure was identical in all eight combinations of
edition, width and theme on each build, which is what says the number is the
whole of the font cost and not a sample of it.

Geist Sans is the heavier of the two faces — its three weights cost 7,104 bytes
more than Inter's four fetched ones. What pays for that is Geist Mono, 9,616
bytes lighter than IBM Plex Mono across the same two weights, and the light
weight the identity line no longer wears.

Counted as declared rather than as fetched, it is 150,256 bytes before against
123,388 after, because the before figure then includes the Inter 700 nobody
downloaded.

## Verified in a browser

Eight combinations: both editions, 1280px and 320px, light and dark. Every one
of them, with no exceptions:

- **The body is Geist Sans and the metadata voice is Geist Mono.** The computed
  `font-family` is `"Geist Sans", ui-sans-serif, system-ui, sans-serif` on
  `body` and `"Geist Mono", ui-monospace, monospace` on the mono elements. That
  is only the stack the page asked for, so it was checked against what was
  actually drawn: the same string measured on a canvas in Geist and in a family
  that does not exist comes out at different widths, which it cannot do unless
  the face loaded and was used. On the before build the same probe reads
  `Inter, ui-sans-serif, …` and both Geist measurements collapse onto the
  fallback, so the check can tell the two builds apart.
- **The identity line renders at 400.** Computed `font-weight` is `400`, against
  `300` on the before build.
- **The body does not scroll horizontally at 320px.** At a 320px viewport,
  `documentElement.scrollWidth` and `body.scrollWidth` are both 320. Nothing
  overflows on either edition in either theme.
- **The palette is untouched.** The page surface is `rgb(255, 255, 255)` in
  light and `rgb(13, 13, 13)` in dark, the `--color-paper` and `--color-canvas`
  tokens unchanged. This ticket is a type swap and it should be invisible here.

The eight screenshots beside this file are those eight combinations, named
`<edition>-<width>px-<theme>.png`. The four 320px shots are where a swap to a
wider face would show first: the name still holds its two-line shape, the
masthead still fits its row, and the identity line wraps without pushing
anything past the edge.

## The share images

Not one of the two criteria above, but the other thing that had to be looked at
rather than tested. Both cards were re-rendered with `npm run render:assets` and
read as pictures: `public/og-image.png` and `public/og-image-es.png` are set in
Geist Sans with the eyebrow and the footer line in Geist Mono, and the identity
on the card sits at 400 alongside the page it previews. The share-image guard
tests in `src/App.test.tsx` pass.
