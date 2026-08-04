# 06: Content rewrite from the CV

**What to build:** Every statement on the site becomes evidence traceable to the CV. A recruiter reads named employers, real dates and specific outcomes with real numbers, and comes away knowing what distinguishes Fran from other engineers with ten years of experience: the AI-layer work.

This is the only ticket that cannot proceed without Fran. It is gated on his approval of a bullet-by-bullet table comparing each CV original against its proposed condensed version.

See ADR 0001 and `CONTEXT.md` for the vocabulary and the rules.

**Status:** resolved

**Blocked by:** 05 (Swiss visual direction). The layout should exist before the final copy is poured into it.

- [x] A comparison table of every CV bullet against its condensed site version is presented to Fran, and approved, before any copy lands in code
- [x] Figures that did not survive the CV PDF text extraction intact are read off the rendered PDF and confirmed, never inferred. Flag rather than guess
- [x] The identity line reads "Software Engineer" and leads with the AI-layer differentiator. It does not say "Principal Software Engineer": this is deliberate
- [x] The name renders as "Fran Menéndez", with the accent
- [x] Experience entries cover The Knot Worldwide (two entries, for the promotion), MOBIKO GmbH (two entries), and Hiberus Tecnología, each with title, employer, location and mode, dates, and a small number of evidence bullets
- [x] The independent work is mentioned without a public URL, worded so no claim depends on the reader clicking through, and structured so a link can be added later without rework
- [x] Recognitions render as one compact line with issuing organisations and dates, not as a card grid
- [x] The skills line is a short factual list of technologies actually worked in, not a categorised chip grid
- [x] The hero carries the CV download as its primary action, with email and LinkedIn secondary
- [x] No availability signalling, no round-number statistics, no emoji in body copy
- [x] Tests assert the identity line and each expected employer, and the existing guard tests still pass
- [x] `npm run build` and `npm run lint` pass

## Comments

**2026-08-04, resolved.**

The bullet-by-bullet comparison is `.scratch/site-refresh/bullet-approval.md`, which
also records Fran's decisions and the reasoning behind each omission. Copy lives in
`src/content.ts`; nothing else in the codebase holds a visitor-facing string.

Four things worth knowing that the ticket did not anticipate:

1. **The independent work already has a public URL.** The CV calls Instagram Checker
   "live" and links `https://instagram-checker-web.vercel.app/`, which returns 200 and
   redirects to `/login`. The ticket's "without a public URL" premise was stale. Fran
   chose copy without the link (D1), because a login wall is a worse click than no
   click. The copy stands alone, so adding an `href` in `content.ts` is the whole
   change if that ever stops being true.
2. **Hiberus is three entries, not one** (D2), following the CONTEXT.md rule that a
   promotion at one employer is two entries. Bullets taper 2/1/1 by recency.
3. **Two ticket-03 guard tests contradicted this ticket and were narrowed, not
   deleted.** `renders no round-number statistic` banned every "N+", but the CV is full
   of them ("100,000+ products", "2M+ weekly users") and those are evidence. It now
   bans the stat-block shape: a round number captioned with a capability noun.
   `does not render "Principal Software Engineer"` banned the string anywhere, but that
   is Fran's real title and belongs on the entry; it now asserts the site does not
   *lead* with it, which is what ADR 0001 actually decided.
4. **The CV was served under two names** and neither was one Fran uses. Fixed in its
   own commit ahead of this one, with a test pinning the asset, the `href` and the
   `download` attribute to one string.

The Principal entry carries all eleven CV bullets. Seven was proposed for page length;
Fran overruled it on the grounds that this is the role carrying the differentiator.

Verified: `npm run build`, `npm run lint`, `npm test` (35 passing), and the rendered
page read in Chrome in both themes with no console errors.
