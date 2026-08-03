# 03: Test seam, and fabricated content removed

**What to build:** The site stops shipping content that cannot be verified, and gains a test that stops it coming back. This repo has no test framework, no test script and no tests, so this ticket establishes the pattern rather than following one.

The guard tests are the point of the exercise. Write them first and watch them fail against the current site (the "∞" renders today, and the hero announces "Principal Software Engineer"), then delete the fabricated content and watch them pass.

**Blocked by:** 02 (Dependencies current, audit clean). The test stack should be installed onto an already-current dependency set, not upgraded immediately afterwards.

**Status:** ready-for-agent

- [ ] A single test seam exists at the rendered application, with a `test` script that runs it
- [ ] Tests assert only what a visitor can observe: visible text, links, attributes. No snapshots, no class-name or token assertions, no component-level tests
- [ ] Guard test: none of the fabricated project names appear in the rendered output
- [ ] Guard test: the "∞" character does not appear
- [ ] Guard test: no round-number mentoring statistic appears
- [ ] Guard test: the identity line does not render "Principal Software Engineer"
- [ ] Each guard test is observed failing before the corresponding content is removed
- [ ] The fabricated Projects page is deleted outright, not commented out
- [ ] The invented statistics block is removed
- [ ] The GitHub link loses its "explore my open source work" framing
- [ ] `framer-motion` is removed, along with the animations it powered
- [ ] Dead CSS (the unused form styles) and the inert Tailwind and PostCSS configs are deleted, along with `autoprefixer`
- [ ] The unused Google Fonts and third-party SF Pro stylesheet links are removed from the HTML entry
- [ ] `npm run build`, `npm run lint` and the test suite all pass
