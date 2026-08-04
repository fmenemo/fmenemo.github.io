# Metadata is static markup in the entry document

The title, description, Open Graph tags, Twitter card tags and canonical link were written by a `SEO.tsx` component from a React effect, so none of them existed until JavaScript had run. Slack, LinkedIn, WhatsApp and search crawlers fetch the document and stop. The tags were therefore invisible to every consumer they were written for, and the site's link previews had been broken for as long as the component had existed, in a way no amount of reading the rendered page would reveal. We decided to move all metadata into `index.html` as static markup and delete `SEO.tsx`, because a tag that arrives after the fetch has already returned is not metadata.

## Consequences

- `SEO.tsx` is deleted and **no library replaces it**. React Helmet and its successors solve the same problem the same way, one render too late. A future change that reintroduces component-rendered metadata reintroduces this bug behind a nicer interface.
- `og:image` and `twitter:image` must be **absolute URLs**. A scraper has no document base to resolve a root-relative path against.
- This is affordable only because the site is one page with no router, which is itself a decision (ADR 0001, and the spec's "no Projects section"). A second route would need its own tags and would force this decision to be reopened.
- The metadata is a **third copy of the identity line**, after `src/content.ts` and the share image in `tools/assets/og-image.html`. Only the first is checked against the CV, so tests in `src/App.test.tsx` bind the other two to it: no figure may appear in the metadata or on the share image that the identity line does not carry. This keeps ADR 0001 covering copy that lives outside `content.ts`.
- The metadata guard tests read `index.html` as text rather than mounting the app, which is the one exception to the single-seam rule in the spec. It has to be: metadata asserted against the rendered DOM passed for `SEO.tsx` and would have gone on passing while the preview stayed broken. The seam is "what the consumer observes", and for metadata the consumer is a scraper reading a document.
- The two `theme-color` values mirror `--color-paper` and `--color-canvas` from `src/index.css` and cannot be tokens, because the browser reads them before any stylesheet exists. The duplication is recorded as a comment beside the tokens.
- The share image is a generated binary in `public/`. Its source and the command that renders it live in `tools/assets/`, so it is redrawn from a file rather than from memory when the copy or the palette changes.
