# 02: Spanish copy, condensed from the Spanish CV

**What to build:** The Spanish edition's words. Every statement a Spanish reader will see, condensed from the `Spanish CV` the way the English copy was condensed from the `original CV`, with a record proving each one traces back.

Nothing renders it yet. That is deliberate: this is where ADR 0001 is enforced for the second edition, and bundling it into the build work would bury the provenance under configuration.

The Spanish copy is **not a translation of the English site**. It is condensed from the Spanish CV, which is a different source document. Bullets may legitimately split, merge or land differently from their English counterparts, and that is allowed. What is not allowed is a statement with no CV behind it.

Where the Spanish CV has already settled a phrase, take it rather than inventing a second Spanish vocabulary. A recruiter will read the page and the CV side by side, and the two disagreeing on Fran's own job title is exactly the kind of small wrongness a `credibility anchor` cannot afford.

This ticket cannot be closed without Fran, on the same grounds as `06-content-rewrite-from-cv` in the last effort: an agent can draft the table, only Fran approves it.

See ADR 0001 and ADR 0004, and `CONTEXT.md` for the vocabulary.

**Status:** ready-for-agent

**Blocked by:** None. Can start immediately, in parallel with 01.

- [ ] A bullet-by-bullet table comparing each Spanish CV original against its proposed condensed site version is presented to Fran, and approved, before any copy lands in code
- [ ] Anything on the Spanish CV that is deliberately absent from the site is recorded in that table with the reason, so a later reader does not mistake an omission for an oversight
- [ ] Figures that did not survive PDF text extraction intact are read off the rendered PDF and confirmed, never inferred. Flag rather than guess
- [ ] Role titles, section names and the identity line take the wording the Spanish CV already uses, rather than a fresh translation of the English site
- [ ] The Spanish `identity line` condenses the CV's *Resumen* paragraph, leads with the equivalent of "Software Engineer" rather than the current job title, and carries the AI-layer `differentiator`
- [ ] Every bullet is `evidence`; no bullet is a `claim`. The same exclusions as the English edition apply: no availability signalling, no stat blocks, no emoji
- [ ] The Spanish content satisfies the shared content type from ticket 01 completely, so a missing section fails type-checking
- [ ] Section anchors stay in English; only the visible labels are Spanish
- [ ] `npm run build` and `npm run lint` pass
