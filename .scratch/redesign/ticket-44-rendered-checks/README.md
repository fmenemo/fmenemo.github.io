# Ticket 44, rendered checks

The branded 404, checked on the dev server at `http://localhost:5173/404.html`
because jsdom cannot see any of it: the face, the width axis, the two themes,
320px, and the states the two routes answer in. The tests in `src/App.test.tsx`
read the document as text and cover what a parser can see — the routes and their
`hreflang`, the pre-paint script, the `theme-color` metas, the hedge guard.
These four pictures are the rest.

## The shots

- `404-light-320.png` — light, 320px, full page. `document.documentElement`
  reports `scrollWidth` 320 against `clientWidth` 320, and no element's right
  edge passes the viewport, so there is no horizontal scroll. The line wraps
  after "THIS PAGE DOES NOT EXIST" and the separator goes with the clause that
  follows it rather than hanging at the end of the line.
- `404-dark-320.png` — the same, dark. The root carries `dark` and the body
  computes `rgb(18, 19, 22)`, which is `--color-stock-dark`.
- `404-light-1280.png` and `404-dark-1280.png` — the nameplate at the top of the
  clamp, drawn wide, over the manila stock and over the slate.
- `404-light-1280-focus-and-hover.png` — both states at once: the English route
  has the keyboard focus ring in the accent, the Spanish route is under the
  pointer and filled. They are the treatment the CV block wears on the site, and
  neither route is drawn as the primary one.

## What was read rather than photographed

- **The face.** `getComputedStyle` on the `h1` returns
  `"Archivo Variable", ui-sans-serif, system-ui, sans-serif` with
  `font-stretch: 112%`, so the nameplate is the self-hosted subset at the wide
  setting rather than a fallback.
- **The theme, both ways.** With `theme` set to `light` in `localStorage` and
  the system asking for dark, the page stayed light: the pre-paint script
  honours the stored choice made on either edition. With the key removed it
  followed the system to dark. Neither reload flashed.
- **Reduced motion.** The page declares no animation and no transition of its
  own beyond `transition-colors` on the two routes, which is the site's own
  interactive treatment, and the `prefers-reduced-motion` sweep in
  `src/index.css` already takes the duration off every transition on the origin.
  There is nothing here for that preference to reach that it does not already
  reach on the two editions.
- **The accessibility tree.** Chrome reads the page as a `main` holding a level-1
  heading "FRAN MENÉNDEZ", the status line, and two links named "ENGLISH" and
  "ESPAÑOL". The three separators are `aria-hidden`, so nobody is read the word
  "slash".

## After the merge

The 404 status itself cannot be checked here: Vite's dev server and `preview`
both serve `/404.html` at its own path with a 200, and it is GitHub Pages that
serves it for an unknown path with a 404. Once this is deployed, a request to a
path that does not exist — `https://fmenemo.github.io/nope` — should return 404
and render this page.
