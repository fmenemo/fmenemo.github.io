# 03: Test seam, and fabricated content removed

**What to build:** The site stops shipping content that cannot be verified, and gains a test that stops it coming back. This repo has no test framework, no test script and no tests, so this ticket establishes the pattern rather than following one.

The guard tests are the point of the exercise. Write them first and watch them fail against the current site (the "∞" renders today, and the hero announces "Principal Software Engineer"), then delete the fabricated content and watch them pass.

**Blocked by:** 02 (Dependencies current, audit clean). The test stack should be installed onto an already-current dependency set, not upgraded immediately afterwards.

**Status:** resolved

- [x] A single test seam exists at the rendered application, with a `test` script that runs it
- [x] Tests assert only what a visitor can observe: visible text, links, attributes. No snapshots, no class-name or token assertions, no component-level tests
- [x] Guard test: none of the fabricated project names appear in the rendered output
- [x] Guard test: the "∞" character does not appear
- [x] Guard test: no round-number mentoring statistic appears
- [x] Guard test: the identity line does not render "Principal Software Engineer"
- [x] Each guard test is observed failing before the corresponding content is removed (see note below: the project-names guard was born green)
- [x] The fabricated Projects page is deleted outright, not commented out
- [x] The invented statistics block is removed
- [x] The GitHub link loses its "explore my open source work" framing
- [x] `framer-motion` is removed, along with the animations it powered
- [x] Dead CSS (the unused form styles) and the inert Tailwind and PostCSS configs are deleted, along with `autoprefixer`
- [x] The unused Google Fonts and third-party SF Pro stylesheet links are removed from the HTML entry
- [x] `npm run build`, `npm run lint` and the test suite all pass

## Note

The spec's sequencing says "the test seam is introduced with stage 1 so that
later stages have a red-green loop available", but the ticket graph puts the
seam here, after both stage 1 tickets. Tickets 01 and 02 therefore shipped
without tests. The spec's actual intent survives, since 04, 05 and 06 all sit
behind this ticket, but the seam is later than the spec's wording implies.

## Resolution

Stack: Vitest 4 + Testing Library + jsdom, configured in `vite.config.ts`
(`test.environment: 'jsdom'`), `npm test` runs `vitest run`. The single seam is
`src/App.test.tsx`: it mounts `<App />` and asserts against
`document.body.textContent` only.

**Red observed before removal.** With the seam installed against the unmodified
site, three of the four guards failed on real content: the "∞" guard, the
round-number guard (on "10+" and "50+"), and the "Principal Software Engineer"
guard. The project-names guard passed from birth because `Projects.tsx` was
already commented out of `App.tsx` and so never rendered; the red state for
that guard is unobservable without first reintroducing the page, which was not
done. framer-motion needed a temporary `IntersectionObserver` stub to let the
app render during the red phase; the stub was deleted along with the library.

**Decisions taken in flight:**

- The round-number guard asserts no `/\d+\s*\+/` match anywhere in the rendered
  text, wider than the ticket's "mentoring statistic" wording. ADR 0001 says
  round-number stats are not used at all, including revised-downward ones, so
  the wide net is the intent. CV-sourced exact figures ("5 developers") pass it.
- The "Principal Software Engineer" guard also scans the whole rendered output,
  so the About prose title was changed to "Software Engineer" alongside the
  hero. Contact copy naming "Principal Engineer" roles was neutralised for the
  same reason. Full copy rewrite remains ticket 06.
- `.btn-outline` was deleted along with the form styles: same species of dead
  CSS, confirmed unused by grep.
- The stray `postcss` devDependency left by the config deletion was removed
  too; `npm audit` still reports zero.

**Explicitly not done here** (later tickets own it): colour ternaries and
`@theme` tokens (04), pre-paint theme script (04), skill chips, claim cards and
remaining copy (05/06), GitHub demoted to footer icon (06), self-hosted fonts
(05), metadata still saying "Full Stack Developer & Designer" (07).

Removing framer-motion shrank the JS bundle from 346.56 kB (109.06 kB gzip) to
216.01 kB (67.04 kB gzip), both measured with `npm run build` on this machine.
