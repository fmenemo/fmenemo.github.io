# 07: Ship gate

**What to build:** The confidence to publish the Spanish edition unhedged.

The whole effort rests on one decision: the Spanish edition carries no badge, banner or footnote telling the reader it is machine-translated, unreviewed or possibly out of date. That decision was justified on the grounds that Fran, a native Spanish speaker, reads the edition before it ships. This ticket is that reading, plus the tests that keep the decision from eroding later.

**This ticket is not agent-grabbable.** An agent can run the suite and draft the guards, but it cannot close the item that matters. If the read-through does not happen, the correct response is not to add the badge back, it is not to ship `/es`.

The hedging guard is the durable half. Decisions like this one get reversed out of politeness by well-meaning future changes, so the test is written in the manner of the existing fabricated-content group: a negative assertion, with a comment saying what it is defending and why, so that whoever trips it goes and reads ADR 0004 instead of deleting the test.

The parity sweep is the other half. The edition table makes a one-sided guard hard to write, but not impossible, and this is the moment to confirm none crept in across tickets 03 to 06.

See ADR 0004, in full, and `CONTEXT.md` on `Edition`.

**Status:** ready-for-human

**Blocked by:** 04 (the language selector), 05 (both CVs) and 06 (the Spanish share image).

- [ ] Fran reads the full Spanish edition as rendered, in both themes, and approves it
- [ ] No hedging vocabulary appears in either edition or either document: nothing calling a version unreviewed, machine-translated, automatic, provisional, or more or less current than the other. Asserted as a negative test, with a comment pointing at the decision it defends
- [ ] The English CV's label on `/es` is confirmed to say **original** and nothing about freshness
- [ ] A parity sweep confirms no guard runs for one edition only, except those inherently per-edition, which are named and justified where they sit
- [ ] Both editions are walked in a browser at mobile and desktop widths, in both themes, with no console errors
- [ ] The rendered preview card for both editions is confirmed against a real scraper, not inferred from markup
- [ ] `npm run build`, `npm run lint` and `npm test` all pass, and the deployed output serves both documents, both CVs and both share images at the paths they are referenced by
- [ ] `CONTEXT.md` and ADR 0004 are re-read against what was actually built, and corrected if the implementation taught us something the decisions did not anticipate
