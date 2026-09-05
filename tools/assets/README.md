# Generated assets

`public/og-image.png`, `public/og-image-es.png` and `public/apple-touch-icon.png` are
checked in as binaries, because a static site has nowhere to generate them at request
time. These are the sources they came from, so none of them has to be redrawn from
memory when the copy or the palette changes.

They are rendered with headless Chrome. There is no build step and no image
dependency: the share images use the site's own `@fontsource` woff2 files out of
`node_modules`, so a card can never drift from the page's typography.

## Rendering

```sh
npm run render:assets
```

That renders **all** of them, and it is one command on purpose. Two commands, or one
command and a manual step, is how a palette change lands on one edition's card and not
the other's (ADR 0004). A third edition would add a source here and a line to the table
in `render.sh`; what it would not add is a second way to render.

If Chrome is not at the macOS default path, point at it:

```sh
CHROME=/path/to/chrome npm run render:assets
```

The script serves the repo over local HTTP for the duration rather than opening the
sources as `file://`. Chrome no longer loads a `file://` subresource from a `file://`
page, and what that looked like was not an error message: the touch icon rendered as a
blank square with a broken-image glyph and the screenshot was written out as though it
had worked. Check the pictures.

Re-rendering an unchanged source has so far produced byte-identical files, but do
not rely on it: a Chrome release can change its PNG encoder or its rasteriser, and
the output would still be correct while no longer matching what is committed. Check
the picture, not the checksum.

## What is in each file

`og-image.css` holds the layout and the palette for every edition's share image, in the
Record (ADR 0005): the running head, the nameplate at the wide end of the width axis,
the identity line under the heavy rule, and the colophon row. Every colour in it is a
copy of a token from `src/index.css` with the token named beside it, because a
standalone page rendered by Chrome cannot read the app's stylesheet — the stylesheet is
the source of truth, and a restyle follows it and re-renders. It is
a separate file for the same reason the render is a single command: an edition-shaped
copy of it is how a restyle reaches one card and misses the other. Each `og-image*.html`
beside it holds its own copy and nothing else, which is also what makes the share-image
guard in `src/App.test.tsx` honest — it reads the body as text, so with the styling out
of the way there is nothing there for it to mistake for words.

The copy on each card is the `identity line` from that edition's content module,
shortened. Like everything else a visitor reads it answers to that edition's CV
(ADR 0001), and the Spanish card is condensed from `src/content.es.ts` rather than
translated from the English picture. If an identity line changes, change its card here
and re-render.

The favicon itself is `public/favicon.svg` and is hand-drawn, not generated. Its two
colours are the Record's ink and stock, copied from the tokens for the same reason the
card's are. Its
letter is geometry rather than type on purpose: a favicon cannot carry a font with
it, so text would render in whatever monospace the visitor's machine happens to have.
`apple-touch-icon.html` screenshots that same SVG at 180x180, referencing it rather
than copying it, because iOS will not take an SVG.
