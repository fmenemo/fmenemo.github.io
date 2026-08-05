# 02: Spanish copy, condensed from the Spanish CV

**What to build:** The Spanish edition's words. Every statement a Spanish reader will see, condensed from the `Spanish CV` the way the English copy was condensed from the `original CV`, with a record proving each one traces back.

Nothing renders it yet. That is deliberate: this is where ADR 0001 is enforced for the second edition, and bundling it into the build work would bury the provenance under configuration.

The Spanish copy is **not a translation of the English site**. It is condensed from the Spanish CV, which is a different source document. Bullets may legitimately split, merge or land differently from their English counterparts, and that is allowed. What is not allowed is a statement with no CV behind it.

Where the Spanish CV has already settled a phrase, take it rather than inventing a second Spanish vocabulary. A recruiter will read the page and the CV side by side, and the two disagreeing on Fran's own job title is exactly the kind of small wrongness a `credibility anchor` cannot afford.

This ticket cannot be closed without Fran, on the same grounds as `06-content-rewrite-from-cv` in the last effort: an agent can draft the table, only Fran approves it.

See ADR 0001 and ADR 0004, and `CONTEXT.md` for the vocabulary.

**Status:** ready-for-human

The table is drafted at `../bullet-approval-es.md` and its three open decisions are
answered (2026-08-04: D1-ES `Tecnologías`, D2-ES the 2/1/1 Hiberus taper, D3-ES the
English edition's bullet order). The copy is in `src/content.es.ts`.

**One deviation to be aware of:** the first criterion says the table is approved *before*
any copy lands in code, and the copy landed on the strength of the three decisions rather
than a read-through of all thirty-odd bullets. Nothing renders it yet (ticket 03 is what
builds `/es`), so no visitor can reach a bullet Fran has not signed off, and a correction
is a one-line edit to a file with one consumer. Reopen this to `ready-for-agent` with the
changes and they go straight in.

**Blocked by:** None. Can start immediately, in parallel with 01.

- [ ] A bullet-by-bullet table comparing each Spanish CV original against its proposed condensed site version is presented to Fran, and approved, before any copy lands in code. **The only box still open, and the reason the status is `ready-for-human`: the table is written and its three decisions are answered, but the read-through of the individual bullets is not done. See the deviation above.** Narrowed 2026-08-05: all 24 bullets in the record were checked mechanically against `src/content.es.ts` and every one matches the shipped copy, resolving the eight entries whose `Site:` line reads `verbatim.` against their `CV:` line. So the table is a faithful description of what is live, and what is left is the judgement no script can make — whether each condensation is true to the Spanish CV and reads as a native speaker's Spanish.
- [x] Anything on the Spanish CV that is deliberately absent from the site is recorded in that table with the reason, so a later reader does not mistake an omission for an oversight
- [x] Figures that did not survive PDF text extraction intact are read off the rendered PDF and confirmed, never inferred. Flag rather than guess
- [x] Role titles, section names and the identity line take the wording the Spanish CV already uses, rather than a fresh translation of the English site
- [x] The Spanish `identity line` condenses the CV's *Resumen* paragraph, leads with the equivalent of "Software Engineer" rather than the current job title, and carries the AI-layer `differentiator`
- [x] Every bullet is `evidence`; no bullet is a `claim`. The same exclusions as the English edition apply: no availability signalling, no stat blocks, no emoji
- [x] The Spanish content satisfies the shared content type from ticket 01 completely, so a missing section fails type-checking
- [x] Section anchors stay in English; only the visible labels are Spanish
- [x] `npm run build` and `npm run lint` pass
