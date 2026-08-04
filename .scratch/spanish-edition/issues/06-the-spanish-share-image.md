# 06: The Spanish share image

**What to build:** When the Spanish edition's link is shared, the card that appears is Spanish all the way through, image included.

This is the largest single piece of work in the effort, for an image most visitors never consciously examine, so the reason it is in scope should be stated plainly. The argument that bought two documents in the first place was that the first Spanish-language impression is not the page, it is the preview card. An English image sitting under a Spanish title is a visibly half-done localisation in the one frame where it shows most, and omitting the image entirely is worse: the card collapses to a small link stub that reads as a dead page.

The share image is a generated binary, and per ADR 0003 its source and the command that renders it live in the tools directory so that it is redrawn from a file rather than from memory. Both editions' images render from that one command. Two commands, or one command and a manual step, is how a palette change lands on one image and not the other.

The guard that matters here is the condensation rule. Nothing on a share image can be checked by a reader, because it is a picture, so every figure on it has to come from the one sentence that was checked against the CV. That guard already exists for the English image and extends to the Spanish one through the edition table.

See ADR 0003 and ADR 0004.

**Status:** ready-for-agent

**Blocked by:** 03 (the Spanish edition exists).

- [ ] A Spanish share image source lives beside the existing one, and both render to their PNGs from a single command
- [ ] The Spanish copy on the image is condensed from the Spanish `identity line`, not translated from the English image
- [ ] The Spanish document references its own image, as an absolute URL, with the declared dimensions a scraper crops to
- [ ] No figure appears on either share image that its own edition's identity line does not carry, asserted from the edition table
- [ ] The share image copy is read as text content, excluding styling, so that letter-spacing and font sizes are never mistaken for copy
- [ ] Both PNGs exist at the paths their documents reference, in the built output
- [ ] The rendered card is checked against a real scraper preview for both editions before the ticket is closed, not inferred from the markup
- [ ] `npm run build`, `npm run lint` and `npm test` pass
