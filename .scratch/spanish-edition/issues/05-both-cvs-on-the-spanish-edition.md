# 05: Both CVs on the Spanish edition

**What to build:** A Spanish recruiter can download Fran's CV in Spanish, and can also take the English one when they need a document to forward onward.

The second button is a service, not a hedge. A recruiter at a Spanish company frequently needs an English artefact to push into an ATS or in front of an international hiring committee, and making them ask for it is the same warmth failure the edition exists to remove.

The label on it is the one asymmetry between the editions that appears anywhere in the UI, and its wording is load-bearing. The English CV is the **original**, which is a fact about where the document was written. It is not "more up to date", "more complete" or "recommended": those say that two versions exist and Fran is unsure which is current, which is a worse admission than the one it guards against. If the Spanish CV can lag, the fix is the ship-together rule below, not a warning to the reader.

That rule is the real content of this ticket. The `original CV` is the authority for facts and the `Spanish CV` is a translation of it, so regenerating one alone lets `/es` assert things that stopped being true, and no test can catch it because a PDF's text is not in the build. A drift test extracting text from both PDFs was considered and rejected in ADR 0004: the site strings are condensations rather than quotations, so it would be a fuzzy matcher failing on line breaks and ligatures.

See ADR 0004 and the `CV` entries in `CONTEXT.md`.

**Status:** ready-for-agent

**Blocked by:** 03 (the Spanish edition exists).

- [ ] The Spanish CV is published as a site asset under a fixed name carrying no version, following the same convention as the original
- [ ] The Spanish edition offers the Spanish CV as its primary download, with the English one beside it labelled as the **original**
- [ ] Neither button's label says or implies that one CV is fresher, fuller or preferred
- [ ] The English edition continues to offer only the original CV, unchanged
- [ ] Each CV is offered as a link to the PDF rather than a scripted download, and each is served under exactly one name everywhere it is referenced, extending the existing guards to the new file
- [ ] The rule that both CVs are regenerated and published together is recorded as a comment where the CV paths are defined, not only in the ADR
- [ ] Both PDFs are confirmed to resolve at the paths the site references, in the built output
- [ ] Tests cover the Spanish edition offering both CVs and the English edition offering one
- [ ] `npm run build`, `npm run lint` and `npm test` pass
