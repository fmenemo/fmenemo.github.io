# 06: Content rewrite from the CV

**What to build:** Every statement on the site becomes evidence traceable to the CV. A recruiter reads named employers, real dates and specific outcomes with real numbers, and comes away knowing what distinguishes Fran from other engineers with ten years of experience: the AI-layer work.

This is the only ticket that cannot proceed without Fran. It is gated on his approval of a bullet-by-bullet table comparing each CV original against its proposed condensed version.

See ADR 0001 and `CONTEXT.md` for the vocabulary and the rules.

**Status:** ready-for-agent

**Blocked by:** 05 (Swiss visual direction). The layout should exist before the final copy is poured into it.

- [ ] A comparison table of every CV bullet against its condensed site version is presented to Fran, and approved, before any copy lands in code
- [ ] Figures that did not survive the CV PDF text extraction intact are read off the rendered PDF and confirmed, never inferred. Flag rather than guess
- [ ] The identity line reads "Software Engineer" and leads with the AI-layer differentiator. It does not say "Principal Software Engineer": this is deliberate
- [ ] The name renders as "Fran Menéndez", with the accent
- [ ] Experience entries cover The Knot Worldwide (two entries, for the promotion), MOBIKO GmbH (two entries), and Hiberus Tecnología, each with title, employer, location and mode, dates, and a small number of evidence bullets
- [ ] The independent work is mentioned without a public URL, worded so no claim depends on the reader clicking through, and structured so a link can be added later without rework
- [ ] Recognitions render as one compact line with issuing organisations and dates, not as a card grid
- [ ] The skills line is a short factual list of technologies actually worked in, not a categorised chip grid
- [ ] The hero carries the CV download as its primary action, with email and LinkedIn secondary
- [ ] No availability signalling, no round-number statistics, no emoji in body copy
- [ ] Tests assert the identity line and each expected employer, and the existing guard tests still pass
- [ ] `npm run build` and `npm run lint` pass
