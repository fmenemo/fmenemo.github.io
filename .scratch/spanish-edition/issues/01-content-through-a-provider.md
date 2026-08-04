# 01: Content reaches the pages through a provider

**What to build:** Nothing a visitor can see. The site renders exactly as it does today, from exactly the same strings, but the strings now arrive from above rather than being reached for from below.

This is the prefactor for the whole effort. A second `edition` means two sets of strings chosen at build time, so no component can go on importing the content module by name. Doing this on its own, with the English site unchanged, keeps the change that follows small.

It also decides the visitor-facing test seam for every later ticket: the root takes its content as input, so one seam can be run over both editions instead of growing a Spanish twin.

See the Testing Decisions in `spec.md`, and `CONTEXT.md` for the vocabulary.

**Status:** ready-for-agent

**Blocked by:** None. Can start immediately.

- [ ] A single content type describes everything a visitor reads, satisfied by the existing English strings with no change to their values
- [ ] The application root accepts that content as input and provides it to the tree; the seven components that import the content module directly read from the provider instead
- [ ] No component imports the content module by name any more, and nothing reads a string through a default or a fallback: an edition supplies everything or fails to compile
- [ ] The visitor-facing test seam becomes the root rendered with content supplied to it, and every existing test is moved onto it rather than reworked
- [ ] Every existing test still passes, asserting the same things about the same copy
- [ ] The rendered English page is unchanged: same text, same order, same anchors
- [ ] `npm run build`, `npm run lint` and `npm test` pass
