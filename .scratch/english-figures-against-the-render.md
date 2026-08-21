# The English figures, read on the rendered CV

ADR 0001 asks that any figure on the site be confirmed against the rendered CV
rather than against text extracted from the PDF, because the extraction runs
against embedded subset-font CMaps and some digits and ligatures do not survive
it. This is that confirmation for the five figures issue #7 shipped. It is a
record, not a guard: nothing reads this file, and no test fails when it goes
stale.

## What was read

`cv/en.md` in `fmenemo/professional-record`, whose last commit is `36eab4d` — the
commit issue #4 names as the source of truth — rendered by that repo's own
chain, `tools/build-cv-html.mjs` into `tools/templates/cv-template.html`. The
artefacts read were `tools/output/cv-en.html`, SHA-256
`e8a77c40…d1d633`, opened in Chromium at A4 width and
read as two full-page screenshots. Its sibling `tools/output/cv-en.pdf` is
`61493cbb…553b31`, the same bytes as the PDF shipped at that commit.

The render was read as a picture. No `pdftotext` output, and no other extraction,
was consulted at any point.

`public/Fran_Menendez_CV.pdf` in this repo is a build older than `36eab4d` and
was not the source for anything here: it still carries "Led development of the
integrated commerce platform", the phrasing this issue replaces. Publishing the
current PDF belongs to a separate issue.

## The five figures

Each was read in the rendered sentence quoted beside it, and each appears in
`src/content.en.ts` in the bullet named.

| Figure | Bullet | Read on the render as |
| --- | --- | --- |
| 23% | Lead — A/B testing | "The winning variant in an ad-layout test lifted served ad impressions 23% against control on an ad-monetised property" |
| $2M+ | Lead — integrated commerce | "Took the integrated commerce platform from proposal to a live MVP, on a $2M+ annual revenue projection." |
| 72% | MOBIKO — API rebuild | "cutting API response times 72% through caching and database query optimization" |
| 70% | MOBIKO — API rebuild | "page loads dropped 70% in Lighthouse" |
| 99.95% | Hiberus — distributed platform | "at 99.95% uptime; still in production" |

Both prose rewrites this issue takes were read on the same render: the commerce
sentence above, and "Restructured the review and release process and mentored
engineers into ownership; the team grew and delivery cycles shortened over the
period."

## The five declined

The render also carries 100% retention, the 85% design-with-components cut,
three global enterprise partnerships, and the 3,000 to 10,000+ growth figure with
its 233%. Issue #4 declined all of them. `src/App.test.tsx` asserts they are
absent from the rendered page, so that decision fails a build rather than living
here.
