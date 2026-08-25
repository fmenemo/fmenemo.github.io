# Ticket 20, checked in a browser

What the ticket asks to see with an eye rather than with a test: one Tab on
each edition focuses a visible skip link, activating it lands on the content,
and an unknown path serves the branded 404 in both themes.

Run on 2026-08-25 against `npm run build` output, in headless Chrome driven
over CDP by `cdp-check.mjs`. `report.json` is what that run read out of the
page; the PNGs are what it looked like.

## How it was run

The site was served by `pages-server.py`, which serves `dist/` the way GitHub
Pages does: an unknown path gets `404.html` with a 404 status. That detail is
the whole point of serving it this way — `vite preview` rewrites every HTML
request to `index.html`, so under it an unknown path returns the English
edition and the 404 page is never seen. It is not a witness for this criterion.

```
npm run build
python3 pages-server.py "$PWD/dist" 4174 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-ticket20 \
  --window-size=1280,900 --hide-scrollbars about:blank &
node cdp-check.mjs "$PWD/.scratch/ticket-20-rendered-checks"
```

## What it found

**The skip link, both editions.** Focus starts on `BODY`; one Tab lands on the
first link in the document — "Skip to content" on `/`, "Saltar al contenido" on
`/es/`, both `href="#main"`. It is on screen and it is drawn: `position: fixed`
at 24×12, 168×37 (203×37 in Spanish), no clip, `visibility: visible`, accent
text `rgb(204, 34, 0)`, and the site's focus ring, `rgb(204, 34, 0) solid 2px`,
because it matches `:focus-visible`. `skip-link-en-focused.png` and
`skip-link-es-focused.png`.

**Activating it.** Enter puts the hash at `#main`, moves focus to `MAIN#main`
so the next Tab continues inside the content, and leaves `main` at the top of
the viewport with "Fran Menéndez" as its first heading. Both editions.

**The 404, both themes.** An unknown path returns 404 and the branded page:
`lang="en"`, title "Page not found | Fran Menéndez", both editions linked with
`hreflang="es"` on the Spanish one. Under `prefers-color-scheme: light` the
page is `#ffffff` on `#111111` with the accent at `#cc2200`; under `dark` the
pre-paint script has already put `dark` on `<html>` and it is `#0d0d0d` on
`#ededed` with the accent at `#ff5540`. `document.fonts.check` confirms both
Geist faces loaded from the copies in `public/fonts/`, so the page is set in
the site's own faces with no bundle behind it. `404-light.png`, `404-dark.png`.

## What this is not

It is not the deployed site. A Run's work reaches `fmenemo.github.io` only
through a pull request Fran merges, so what was checked is the build that
branch produces, served under Pages' own 404 rule. Nothing here was checked in
Safari or Firefox.
