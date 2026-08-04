# 01: Content reaches the pages through a provider

**What to build:** Nothing a visitor can see. The site renders exactly as it does today, from exactly the same strings, but the strings now arrive from above rather than being reached for from below.

This is the prefactor for the whole effort. A second `edition` means two sets of strings chosen at build time, so no component can go on importing the content module by name. Doing this on its own, with the English site unchanged, keeps the change that follows small.

It also decides the visitor-facing test seam for every later ticket: the root takes its content as input, so one seam can be run over both editions instead of growing a Spanish twin.

See the Testing Decisions in `spec.md`, and `CONTEXT.md` for the vocabulary.

**Status:** resolved

**Blocked by:** None. Can start immediately.

- [x] A single content type describes everything a visitor reads, satisfied by the existing English strings with no change to their values
- [x] The application root accepts that content as input and provides it to the tree; the seven components that import the content module directly read from the provider instead
- [x] No component imports the content module by name any more, and nothing reads a string through a default or a fallback: an edition supplies everything or fails to compile
- [x] The visitor-facing test seam becomes the root rendered with content supplied to it, and every existing test is moved onto it rather than reworked
- [x] Every existing test still passes, asserting the same things about the same copy
- [x] The rendered English page is unchanged: same text, same order, same anchors
- [x] `npm run build`, `npm run lint` and `npm test` pass

## Comments

**The chrome moved into the content type.** Section headings, nav labels, the accessible names of the controls, the CV button and the contact-list labels were literals inside the components. A visitor reads all of them, so the type carries them or `/es` shows English through the gaps. Names are not chrome and stayed where they are drawn: `FM`, `GitHub` and `LinkedIn` are the same in every edition. The rule is recorded as a `Chrome` entry in `CONTEXT.md`.

**The nav labels are separate keys from the section headings**, though the two coincide in English. The Spanish CV's heading is "Experiencia profesional", which the masthead cannot carry and stay one line at every width, so ticket 02 is free to give them different words.

**A fourth test seam was added**, asserting that nothing but the entry document imports an edition by name. It contradicted the "no new seams" line in `spec.md`, so that line and the reasoning for the exception are now recorded in the Testing Decisions there and in the README.

**The unchanged-page criterion was checked by rendering `HEAD` in a scratch worktree** and diffing the full body HTML against the new render, rather than by trusting the existing assertions. Byte-identical.
