# The half of ticket 20's browser check that needs the deployment

`README.md` beside this file records what was checked, and what it was checked
against: the build this branch produces, served locally under GitHub Pages' own
404 rule. The ticket asks for one thing more — "an unknown path on the deployed
site" — and a Run cannot produce it. Work reaches `fmenemo.github.io` only
through a pull request Fran merges, so the deployment is downstream of the
branch that is supposed to be verified by it.

This is the pass to run once that merge has published, from a checkout of
`main`. It is the same script, pointed at the live origin:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --remote-debugging-port=9333 --user-data-dir=/tmp/chrome-ticket20 \
  --window-size=1280,900 --hide-scrollbars about:blank &
node .scratch/ticket-20-rendered-checks/cdp-check.mjs \
  "$PWD/.scratch/ticket-20-rendered-checks/deployed" https://fmenemo.github.io
```

No local server: the 404 rule under test is Pages' own, which is the whole
difference between this pass and the one already recorded.

## What it should read

Against `deployed/report.json`, and the values the local pass produced are in
`report.json` beside it:

- `404-status` is `404`. Pages serves `/404.html` from the site root for a path
  it does not recognise, and it does so with the status rather than a redirect.
  This is the one line that could not be produced locally without emulating it.
- `en.focused` and `es.focused`: `isFirstLink` true, `href` `#main`, text "Skip
  to content" and "Saltar al contenido", `position: fixed`, `clip: none`,
  `inViewport` true, `color` and `outline` `rgb(204, 34, 0)`.
- `en.landed` and `es.landed`: `hash` `#main`, `activeElement` `MAIN#main`,
  `mainTop` 0.
- `404-light` and `404-dark`: `lang` `en`, both editions linked with
  `hreflang="es"` on the Spanish one, `darkClass` false then true, backgrounds
  `rgb(255, 255, 255)` then `rgb(13, 13, 13)`, `headingFontLoaded` and
  `monoFontLoaded` true.

A difference between the two passes is a difference between the build and what
Pages serves, and there is one thing that could plausibly produce one: the font
files under `/fonts/`, which the 404 page names by path rather than by hash. If
`headingFontLoaded` is false on the deployed run, the copies in `public/` did
not ship and the page fell back to the system face.

Then say so on the ticket. Only the driving session writes that comment.
