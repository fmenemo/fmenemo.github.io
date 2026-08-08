# 04: Unified sign-on joins the Principal role

**Status:** needs-triage

**Blocked by:** None. **Waiting on decision D1** in
`.scratch/bullets-against-the-reworked-cv/bullet-approval.md`, which is a yes/no on whether this
work belongs on the site at all. If D1 is answered no, close this `wontfix`.

**What to build:** Both editions carry the unified sign-on programme: one account replacing five
separate logins across Bump articles, baby names, registry, shop and the native apps.

This is the only whole bullet the site is missing. The CV's Principal role has twelve; the site
has eleven; this is the twelfth. It arrived in the CV on 2026-08-06 and this repo was never told,
which is the same ADR 0001 fault the date correction fixed — a correction landing in the CV's
repo and stopping there.

It is worth adding on its own merits rather than for completeness: a five-product consolidation is
a scope claim nothing else on the page makes, and it needs no condensing to fit the site's bullet
length. It also gives the session-continuity bullet its other half — that bullet currently reads
as though the Bump/Shop handoff stood alone, when it was one piece of a wider sign-on programme.

Place it immediately before the session-continuity bullet in both editions. Take the wording from
the record, which is the CV's own sentence in each language, unchanged.

Note this takes the Principal role from eleven bullets to twelve, the longest entry on the page.
If that reads as too heavy once rendered, the fix is a decision about which bullet leaves — raise
it rather than silently trimming, since every bullet there is separately approved.

- [ ] The unified sign-on bullet is in `src/content.en.ts`, matching the CV sentence
- [ ] The unified sign-on bullet is in `src/content.es.ts`, matching the Spanish CV sentence
- [ ] It sits immediately before the session-continuity bullet in both editions
- [ ] The Principal entry still reads as a list rather than a wall, checked rendered
- [ ] `npm run build`, `npm run lint` and `npm test` pass
