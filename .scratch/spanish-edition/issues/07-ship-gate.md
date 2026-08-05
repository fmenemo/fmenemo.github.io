# 07: Ship gate

**What to build:** The confidence to publish the Spanish edition unhedged.

The whole effort rests on one decision: the Spanish edition carries no badge, banner or footnote telling the reader it is machine-translated, unreviewed or possibly out of date. That decision was justified on the grounds that Fran, a native Spanish speaker, reads the edition before it ships. This ticket is that reading, plus the tests that keep the decision from eroding later.

**This ticket is not agent-grabbable.** An agent can run the suite and draft the guards, but it cannot close the item that matters. If the read-through does not happen, the correct response is not to add the badge back, it is not to ship `/es`.

The hedging guard is the durable half. Decisions like this one get reversed out of politeness by well-meaning future changes, so the test is written in the manner of the existing fabricated-content group: a negative assertion, with a comment saying what it is defending and why, so that whoever trips it goes and reads ADR 0004 instead of deleting the test.

The parity sweep is the other half. The edition table makes a one-sided guard hard to write, but not impossible, and this is the moment to confirm none crept in across tickets 03 to 06.

See ADR 0004, in full, and `CONTEXT.md` on `Edition`.

**Status:** ready-for-human

The agent-closable half is done: the hedging guard is written and verified to bite,
the parity sweep is clean, both editions were walked in a browser, the three commands
pass, and `CONTEXT.md` and ADR 0004 were re-read against what shipped. What remains is
the two items that were never delegable — Fran's read-through, and the scraper check
that needs a public `/es`.

**Blocked by:** 04 (the language selector), 05 (both CVs) and 06 (the Spanish share image).

- [ ] Fran reads the full Spanish edition as rendered, in both themes, and approves it. **The item that matters, and the only one an agent cannot close.** Everything below it is done, so this and the scraper check are all that stand between here and shipping
- [x] No hedging vocabulary appears in either edition or either document: nothing calling a version unreviewed, machine-translated, automatic, provisional, or more or less current than the other. Asserted as a negative test, with a comment pointing at the decision it defends — `nothing hedges the edition` in `src/App.test.tsx`, run from the edition table, in both languages, over three surfaces: what a visitor reads (text plus the `title`, `alt` and `aria-label` attributes, since ADR 0004 bans a hedge in a *tooltip* by name), what a scraper reads, and the share image. The vocabulary is in two lists. Some of it is a hedge wherever it appears; "outdated", "beta", "provisional" and "más completa" are also ordinary CV vocabulary, so those count only when said within sixty characters of a word naming a version of the site or its language. Matching them bare would have failed a true piece of evidence under a comment telling its author to go and read ADR 0004, which is the worst shape this guard could fail in. Verified by planting: a hedge on each of the three surfaces failed exactly that surface's assertion; one reaching a reader only through an `aria-label` was caught; and a bullet reading "Reemplacé una arquitectura obsoleta y lancé la beta pública de una plataforma más completa" passed, as evidence should. All plants reverted
- [x] The English CV's label on `/es` is confirmed to say **original** and nothing about freshness — it reads `CV en inglés (original)`, and `says where the original was written and nothing about which is fresher` already asserted both halves
- [x] A parity sweep confirms no guard runs for one edition only, except those inherently per-edition, which are named and justified where they sit — every guard sits inside `describe.each(editions)` with no conditional or skip; the four blocks outside it are the two that compare the editions *to each other* (`the two editions know about each other`, `the original CV is offered on both editions`), the one asset both editions share (`the favicon`), and the source-import seam, each commented with why it cannot be a row
- [x] Both editions are walked in a browser at mobile and desktop widths, in both themes, with no console errors — `npm run preview` over the built output, at 1440×900 and 390×844. The selector carried both the fragment and the theme across the switch in each direction, the masthead keeps the language control at mobile width, and the console was empty on both documents
- [ ] The rendered preview card for both editions is confirmed against a real scraper, not inferred from markup. **Needs a public `/es`, so it cannot happen before deploy.** Ticket 06 got as far as is possible locally: both documents fetched over HTTP with a scraper user-agent and no JavaScript, their `og:image` read out of the response, and both PNGs fetched from those paths and looked at
- [x] `npm run build`, `npm run lint` and `npm test` all pass, and the deployed output serves both documents, both CVs and both share images at the paths they are referenced by — build and lint clean, 189 tests pass (the count fell from 223 because the hedging guard moved from twenty `it.each` cases to six assertions that each report every pattern they caught). `dist/` was served and every referenced path returned 200 with the right content type: both documents, `Fran_Menendez_CV.pdf`, `Fran_Menendez_CV_ES.pdf`, `og-image.png`, `og-image-es.png`, `favicon.svg`, `apple-touch-icon.png`. Confirmed against the build output; the deployed copy of it is the same artefact and is checked at deploy alongside the scraper item above
- [x] `CONTEXT.md` and ADR 0004 are re-read against what was actually built, and corrected if the implementation taught us something the decisions did not anticipate — `CONTEXT.md` needed nothing: every `Edition`, `Chrome` and `CV` entry describes what shipped. ADR 0004 gained the two things the hedging guard taught, on its no-hedging consequence: that the vocabulary splits into words that always hedge and words that only hedge when said about a version of the site, and that the guard reads the entry document parsed rather than raw, unlike ADR 0003's metadata seam, because a comment defending this very paragraph would be written in the words being banned
