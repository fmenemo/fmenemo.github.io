# 02: The review dashboard reviews the middle band, not the rejects

**Status:** needs-info

**Blocked by:** None between tickets — but **do not start** until C3 is marked in
`.scratch/bullets-against-the-reworked-cv/bullet-approval.md`. Flip to `ready-for-agent` when it
is.

**What to build:** Both editions describe the semantic product matching system the way it
actually worked: banded by confidence, with the strongest matches served automatically and no
human involved, the weakest discarded outright, and only the band between them routed to the
review dashboard built inside PayloadCMS.

The site currently says the dashboard handles "matches below the confidence threshold". Per the
CV those are *discarded*. As written the site describes a system that spends human attention
reviewing its own rejects — which is both untrue and a worse design than the real one, so the
error costs credibility in the one place the page is trying to earn it.

Both editions in the same change, taking the approved wording verbatim.

**Which version was approved matters here.** The record offers a figure-light version and a
fuller one carrying about-90%-automatic and sub-50ms p95 across 100,000+ products. The figures
were confirmed on the rendered PDF pages per ADR 0001; use whichever is ticked, and do not
import figures from the CV that the approved wording does not contain.

- [ ] The semantic matching bullet in `src/content.en.ts` matches the approved C3 wording
- [ ] The semantic matching bullet in `src/content.es.ts` matches the approved C3 wording
- [ ] Neither edition says or implies that the reviewed set is the below-threshold set
- [ ] Any figure that ships appears in the approved wording and on the rendered CV page
- [ ] `npm run build`, `npm run lint` and `npm test` pass
