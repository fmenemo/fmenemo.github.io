# 05: Both CVs on the Spanish edition

**What to build:** A Spanish recruiter can download Fran's CV in Spanish, and can also take the English one when they need a document to forward onward.

The second button is a service, not a hedge. A recruiter at a Spanish company frequently needs an English artefact to push into an ATS or in front of an international hiring committee, and making them ask for it is the same warmth failure the edition exists to remove.

The label on it is the one asymmetry between the editions that appears anywhere in the UI, and its wording is load-bearing. The English CV is the **original**, which is a fact about where the document was written. It is not "more up to date", "more complete" or "recommended": those say that two versions exist and Fran is unsure which is current, which is a worse admission than the one it guards against. If the Spanish CV can lag, the fix is the ship-together rule below, not a warning to the reader.

That rule is the real content of this ticket. The `original CV` is the authority for facts and the `Spanish CV` is a translation of it, so regenerating one alone lets `/es` assert things that stopped being true, and no test can catch it because a PDF's text is not in the build. A drift test extracting text from both PDFs was considered and rejected in ADR 0004: the site strings are condensations rather than quotations, so it would be a fuzzy matcher failing on line breaks and ligatures.

See ADR 0004 and the `CV` entries in `CONTEXT.md`.

**Status:** resolved

**Blocked by:** 03 (the Spanish edition exists).

- [x] The Spanish CV is published as a site asset under a fixed name carrying no version, following the same convention as the original

  `public/Fran_Menendez_CV_ES.pdf`, taken from `~/Downloads/Fran_Menendez_CV_ES.pdf`, which is the document ticket 02 condensed the Spanish copy from. The English CV sitting beside it in that folder is byte-identical to the one already published, so the pair that shipped is a matched pair rather than a new Spanish CV against an older English one.
- [x] The Spanish edition offers the Spanish CV as its primary download, with the English one beside it labelled as the **original**

  "Descargar CV" in the bordered block, "CV en inglés (original)" beside it in the accent treatment the email and LinkedIn links already wear.
- [x] Neither button's label says or implies that one CV is fresher, fuller or preferred
- [x] The English edition continues to offer only the original CV, unchanged

  Confirmed in a browser: the English hero renders one CV link, at the same href and download name as before.
- [x] Each CV is offered as a link to the PDF rather than a scripted download, and each is served under exactly one name everywhere it is referenced, extending the existing guards to the new file

  The two guards that read `edition.cv` now read a list and assert the whole of it in order, so an edition growing or losing a download fails rather than being noticed by a reader.
- [x] The rule that both CVs are regenerated and published together is recorded as a comment where the CV paths are defined, not only in the ADR

  On the `CvDownload` type in `content.ts`, which is where the shape of a CV entry is defined, and pointed at from the `cvs` block in each content module.
- [x] Both PDFs are confirmed to resolve at the paths the site references, in the built output

  `vite preview` over `dist/`: `/Fran_Menendez_CV.pdf` and `/Fran_Menendez_CV_ES.pdf` both 200 `application/pdf`, at 185,491 and 238,519 bytes.
- [x] Tests cover the Spanish edition offering both CVs and the English edition offering one

  From the edition table, where each row states its whole list of downloads, plus one group outside it that sees both editions at once: the original is offered on both, the Spanish CV leads on `/es`, and the label naming the original says nothing about which is fresher.
- [x] `npm run build`, `npm run lint` and `npm test` pass

**Design note, not asked for by the ticket:** `contact.cv` (a path) and `chrome.hero.cv` (its label) became one list, `contact.cvs: CvDownload[]`, and `chrome.hero` is gone. Keeping the labels in `chrome` would have paired two lists by position, and an edition offering two downloads is exactly where that goes wrong. The precedent for a label living beside its target rather than in `chrome` is `contact.linkedinLabel`, which was already there. The `Chrome` entry in `CONTEXT.md` said "the name of a control" without qualification, so it now names this exception, in the same shape as the exception it already made for names.
