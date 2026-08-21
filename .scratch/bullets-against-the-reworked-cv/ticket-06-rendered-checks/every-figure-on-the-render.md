# Every figure the site ships, read on the rendered CV

Ticket 06's criterion 10 — "Every figure that ships was read on the rendered CV
page, not extracted from the PDF" — was judged **partly met** by the review of
`sandcastle/issue-6`: "attested but not evidenced. The only record is prose."
This is the evidence. The pages are here beside it, so a reader checks the claim
against the picture rather than against a sentence saying somebody looked.

## What was read

`public/Fran_Menendez_CV.pdf`, SHA-256
`61493cbb6aeee2e6a8a91178e5f9e64fc857f66bd6479db94557e07212553b31`. That is the
`36eab4d` build #4 names as the source of truth, and since #12 it is also what
this site publishes — the earlier record's caveat about a stale `public/` copy no
longer holds, and the digest above is the one check that says so.

Rendered at 150 dpi and read as pictures:

- `cv-render-page-1.png` — summary, skills, and the Principal Software Engineer
  entry.
- `cv-render-page-2.png` — the rest of Principal, Lead, MOBIKO and Hiberus.

No `pdftotext` output and no other extraction was consulted, which is what
ADR 0001 asks: the CV's text layer is extracted against embedded subset-font
CMaps and some digits and ligatures do not survive it.

## The fourteen figures, and the sentence each was read in

Every entry in the `figures` array of `src/App.test.tsx`, in the order the array
has them.

| Figure | Page | Read on the render as |
| --- | --- | --- |
| 850ms | 2 | "query response times dropped from 850ms to 34ms" |
| 34ms | 2 | the same sentence |
| 100,000+ | 1, 2 | "p95 query latency stayed under 50ms across 100,000+ products" (p1); "Migrated PayloadCMS from v2 to v3 for 100,000+ products" (p2) |
| 2M+ | 2 | "reworked caching for 2M+ weekly users" |
| $2M+ | 2 | "Took the integrated commerce platform from proposal to a live MVP, on a $2M+ annual revenue projection." |
| 500k+ | 2 | "processing 500k+ daily mobility events" |
| 1M+ | 2 | "Built a platform processing 1M+ daily entries" |
| 100k+ | 2 | "integrating the official API for 100k+ concurrent users" |
| 8-person | 2 | "Managed an 8-person cross-functional team" |
| 23% | 2 | "lifted served ad impressions 23% against control on an ad-monetised property" |
| 72% | 2 | "cutting API response times 72% through caching and database query optimization" |
| 70% | 2 | "page loads dropped 70% in Lighthouse" |
| 99.95% | 2 | "at 99.95% uptime; still in production" |
| 90% | 1 | "the strongest matches served automatically - about 90% of throughput, with no human review" |
| 50ms | 1 | "p95 query latency stayed under 50ms across 100,000+ products" |

`$2M+` is the one line this record changed rather than only evidenced. It ships
at `src/content.en.ts:81` and was read on the render when #7 took it
(`.scratch/english-figures-against-the-render.md`), but it was never added to
the guard — and the guard is inclusion-only, so `2M+` matching as a substring of
`$2M+` hid the omission. It is in the array now, and a review of #11 found the
same gap from the standards side.

## The four figures the CV states and the site declines

Read on the same two renders, which is what makes declining them a decision
rather than an oversight:

- **100% retention** — p2, "mentored 5 developers, resulting in 2 promotions,
  with 100% retention across the period."
- **roughly 85%** — p1, "it took design-with-components from about a week to
  under a day, roughly 85%."
- **three global enterprise partnerships** — p2, "the company's enterprise
  expansion - three global enterprise partnerships."
- **3,000 to 10,000+, and its 233%** — p2, "Scaled the user base from 3,000 to
  10,000+ users (233% growth)."

`src/App.test.tsx`'s `declinedFigures` asserts each is absent from the rendered
page, so that decision fails a build rather than living in this file.
