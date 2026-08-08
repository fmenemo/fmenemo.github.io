# 05: The figures the CV gained

**Status:** needs-triage

**Blocked by:** None. **Waiting on decision D2** in
`.scratch/bullets-against-the-reworked-cv/bullet-approval.md`, which chooses which figures ship.
Until that is answered there is nothing here to build. If D2 is answered "take none", close this
`wontfix`.

**What to build:** Whichever of the eight figures the CV gained are approved, attached to their
bullets in both editions.

None of this is a correction. The site is not wrong without these — the CV's correctness pass
simply added measured outcomes that did not exist when the site's bullets were approved, so the
site has never made a decision about them either way. That is why this is separate from tickets
01 to 03 and can be deferred indefinitely without leaving anything untrue on the page.

The eight candidates are tabulated in the record with their bullets. Three are recommended there
— the 23% ad-impression lift, the 72% API response time, and 99.95% uptime — on the grounds that
each attaches a measured outcome to a bullet that currently ends on the mechanism, and all three
are outcomes rather than scale nouns. The recommendation is a starting point to disagree with,
not a default.

**Every figure that ships must be confirmed on the rendered CV page before it lands**, per the
ADR 0001 consequence about extraction against subset-font CMaps mangling digits. All eight were
confirmed during the sweep, but confirm again for whatever actually ships rather than trusting
this sentence — that is the point of the rule.

Whatever is chosen goes into both editions in the same change, each from its own CV's rendering
of the number. Spanish uses comma decimals and period thousands separators; the Spanish CV
already writes them correctly, so take them from there rather than converting the English ones.

- [ ] Every approved figure appears in its bullet in `src/content.en.ts`
- [ ] Every approved figure appears in its bullet in `src/content.es.ts`, in Spanish number format
- [ ] No figure ships that D2 did not approve
- [ ] Each shipped figure was read on the rendered CV page for its edition
- [ ] `npm run build`, `npm run lint` and `npm test` pass
