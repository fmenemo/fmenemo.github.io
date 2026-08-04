# 03: The Spanish edition exists at /es

**What to build:** A Spanish reader who is handed `fmenemo.github.io/es` gets the whole site in Spanish, and a scraper handed the same URL renders a Spanish preview card without running any JavaScript.

This is the tracer bullet: the first ticket where the `Spanish edition` is a thing that exists rather than a plan. After it, `/es` is demoable end to end, with the selector, the CVs and the share image still to come.

It reopens ADR 0003, which said in as many words that a second route would force the question. The answer is a twin document, not a retreat to component-rendered metadata: the reasoning there is unchanged and now simply applies twice.

It is also where the test parameterisation cost lands. The suite gains one table with a row per edition, and the existing structural, content and metadata groups run over it. Resist the shortcut of adding Spanish-specific tests alongside the English ones: the point of the table is that a guard covering one edition and not the other becomes impossible to write by accident, which is the failure mode a second edition invites.

See ADR 0003, ADR 0004, and the Testing Decisions in `spec.md`.

**Status:** resolved

**Blocked by:** 01 (content through a provider) and 02 (Spanish copy). The first supplies the seam, the second supplies the words.

- [x] The build emits two documents, the existing one at `/` and a second at `/es`, each booting the application with its own edition's content
- [x] `/es` serves the approved Spanish copy in full: hero, experience, independent work, recognitions, technologies and contact
- [x] The English edition is unchanged at its existing URL, with the same text, anchors and behaviour as before
- [x] Each document declares the language of its own edition
- [x] Each document carries its own title, description, Open Graph and Twitter tags, canonical link and theme colours as **static markup**. No metadata is written by a component, in either edition
- [x] Both documents cross-link with `hreflang` alternates, and `x-default` points at the English edition
- [x] The pre-paint theme script runs in both documents, so a dark-mode visitor sees no light flash on either. It is duplicated rather than imported, because it must run before any module loads
- [x] A visitor's theme choice persists across the two editions
- [~] The test suite defines one edition table, each row bundling that edition's content, entry document and share image source; the structural, content and metadata groups run over it

  The table is built and the structural, content, theme and metadata groups run over it. Each row carries its content module, its entry document and its metadata expectations, but **not a share image source**: there is one share image and it is the English one, so a Spanish column would have named a file that does not exist. The share-image group therefore stays outside the table, named `the English share image ...` and commented as per-edition-until-06. Ticket 06 adds the column and moves the group onto it.
- [x] Guards that are inherently per-edition stay per-edition and are named as such, because each edition's copy is checked against a different CV
- [x] The Spanish identity line's condensation guard holds: no figure appears in Spanish metadata that the Spanish identity line does not carry
- [~] Every asset each document references exists at the path it is referenced by

  Holds for the documents: both reference `/og-image.png`, `/favicon.svg` and `/apple-touch-icon.png`, all present, asserted from the table and confirmed in the built output. It does **not** hold for the CV the Spanish *page* links: `content.es.ts` points at `/Fran_Menendez_CV_ES.pdf` and that PDF is ticket 05's to publish. `/es` demos end to end apart from that one button.
- [x] `npm run build`, `npm run lint` and `npm test` pass, and both documents are inspected in a browser in both themes with no console errors
