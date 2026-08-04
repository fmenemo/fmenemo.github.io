# Generated assets

`public/og-image.png` and `public/apple-touch-icon.png` are checked in as binaries,
because a static site has nowhere to generate them at request time. These are the
sources they came from, so neither has to be redrawn from memory when the copy or
the palette changes.

Both are rendered with headless Chrome. There is no build step and no image
dependency: the pages use the site's own `@fontsource` woff2 files out of
`node_modules`, so the share image can never drift from the page's typography.

Run from the repo root, with `node_modules` installed:

```sh
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# The share image (1200x630), referenced by og:image and twitter:image.
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot=public/og-image.png \
  "file://$PWD/tools/assets/og-image.html"

# The iOS home-screen icon (180x180), rendered from public/favicon.svg.
"$CHROME" --headless --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=180,180 --screenshot=public/apple-touch-icon.png \
  "file://$PWD/tools/assets/apple-touch-icon.html"
```

Re-rendering an unchanged source has so far produced byte-identical files, but do
not rely on it: a Chrome release can change its PNG encoder or its rasteriser, and
the output would still be correct while no longer matching what is committed. Check
the picture, not the checksum.

The favicon itself is `public/favicon.svg` and is hand-drawn, not generated. Its
letter is geometry rather than type on purpose: a favicon cannot carry a font with
it, so text would render in whatever monospace the visitor's machine happens to have.

The copy on the share image is the identity line from `src/content.ts`, shortened.
Like everything else a visitor reads, it answers to the CV (ADR 0001): if the
identity line changes, change it here and re-render.
