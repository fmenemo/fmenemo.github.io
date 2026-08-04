# fmenemo.github.io

Fran Menéndez's personal site. Its job is narrow: confirm, for someone who already
has his name, that he is real and senior. See `CONTEXT.md` for the vocabulary and
`docs/adr/` for the decisions.

A single scrolling page, no router, React as the only runtime dependency.

## Quick start

```bash
npm ci
npm run dev
```

## Scripts

- `npm run dev` starts the dev server
- `npm run build` typechecks and builds to `dist/`
- `npm run preview` serves the built site
- `npm run lint` runs ESLint
- `npm test` runs the test suite
- `npm run deploy` publishes `dist/` to GitHub Pages, manually and deliberately

## Layout

```
index.html          the entry document, and every metadata tag a scraper reads
src/
├── content.ts      every string a visitor reads on the page
├── index.css       the design tokens: palette, type scale, spacing rhythm
├── styles.ts       the three interactive treatments and the metadata voice
├── theme.ts        resolving and persisting the light/dark choice
├── App.test.tsx    the whole test suite
├── components/     Navbar, Footer, Section, Container
├── pages/          the sections of the one page
└── hooks/          useDarkMode
public/             served at the site root: the CV, the favicon, the share image
tools/assets/       sources for the two generated PNGs in public/
docs/adr/           the decisions, and why
.scratch/           issues and specs
```

## Content rules

Everything on the page answers to `public/Fran_Menendez_CV.pdf`. Where the site and
the CV disagree, the CV wins and the site is wrong. Statements are evidence, tied to
a named employer, date or artefact; capability claims are removed on sight. This is
ADR 0001, and the tests in `src/App.test.tsx` enforce the parts of it that a future
change is most likely to undo.

## Metadata

The title, description, Open Graph and Twitter tags are static markup in
`index.html`, not written by a component. Link scrapers fetch the document and stop
without running React, so a tag rendered by the app exists too late to be read. This
is ADR 0003, and it is the reason there is no React Helmet here: it would solve the
same problem the same way, one render too late.

## Testing

Vitest, Testing Library and jsdom. One seam: the test mounts the whole app and reads
the resulting DOM for what a visitor can observe. No snapshots, no component tests,
no assertions on class names. The one exception is the metadata block, which reads
`index.html` directly, because the document is what a scraper observes.
