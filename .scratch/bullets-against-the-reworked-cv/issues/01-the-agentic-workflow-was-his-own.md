# 01: The agentic workflow was his own, not the team's

**Status:** needs-info

**Blocked by:** None between tickets — but **do not start** until C1 and C2 are marked in
`.scratch/bullets-against-the-reworked-cv/bullet-approval.md`. The copy is written and waiting
on Fran's sign-off; landing it unapproved is the exact failure the bullet-approval convention
exists to prevent. Flip this to `ready-for-agent` when the boxes are ticked.

**What to build:** Neither edition claims Fran built the team's agentic AI development workflow.
Both say what the CV says: he built and ran it for his own production delivery, and then drove
its practices into the team's process — which is the stronger claim, and the one the site is
currently not making.

This is **one claim in two places**, which is why it is one ticket. The Principal bullet and the
identity line make the same overclaim at different altitudes. Shipping either alone leaves the
first sentence of the page contradicting the bullet three inches below it.

Both editions in the same change. Under ADR 0004 each is condensed from its own CV, and both CVs
were corrected identically, so the two edits are parallel rather than one being a translation of
the other. Take the approved wording from the record verbatim — it is the deliverable, not a
starting point.

**The identity line grows, and that is the part with a surprise in it.** EN goes 189 → 256
characters, ES 214 → 315, and it sits in the hero where the page is least forgiving. The record
carries a shorter alternative for each edition; which one is approved is recorded there. Look at
both editions rendered at a narrow width before calling this done — the honest phrasing is
genuinely wordier than the overclaim was, because "made team-wide standards" collapsed two
different relationships into three words.

**No new guard.** A negative assertion over the words "the team's" would be the banned-word list
this repo already rejected in `.scratch/catch-up-with-the-cv/issues/01`, one CV rework behind from
the day it lands. The durable half of this fault is ticket 06.

- [ ] The Principal bullet in `src/content.en.ts` matches the approved C1 wording
- [ ] The Principal bullet in `src/content.es.ts` matches the approved C1 wording
- [ ] `identity.line` in both content files matches the approved C2 wording
- [ ] Neither edition attributes the agentic workflow to the team anywhere on the page
- [ ] The identity line still leads with the phrase `App.test.tsx` matches on, and still carries
      the three differentiator terms each edition asserts
- [ ] The hero holds at narrow widths in both editions, checked rendered
- [ ] `npm run build`, `npm run lint` and `npm test` pass
