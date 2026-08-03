# 01: Reproducible build

**What to build:** A clean checkout of this repo installs and builds successfully. Today it does not: `package.json` declares React 18 while React 19 is installed, omits the Tailwind Vite plugin that the Vite config imports, and omits an installed router, so `npm ci` on a fresh machine produces a build that fails. After this ticket, the manifest describes the application that actually runs, and dependency updates are watched automatically.

**Blocked by:** None, can start immediately.

**Status:** resolved

- [x] `package.json` lists exactly the dependencies the application imports, at the versions actually in use
- [x] The Tailwind Vite plugin used by the build config is declared as a dependency
- [x] `react-router-dom` is removed: it is installed, imported nowhere, and carries a high-severity advisory
- [x] The package name reflects this project rather than a leftover scaffold name
- [x] The lockfile is regenerated from the corrected manifest and committed
- [x] `npm ci && npm run build` succeeds from a clean checkout with no `node_modules`
- [x] `npm run lint` passes
- [x] Dependabot is configured to watch npm dependencies
- [x] No CI workflow is added: this is a deliberate decision, not an omission

## Comments

The manifest drift was worse than described: the lockfile's own root entry was
generated from a different `package.json` (name `portfolio-vite`, React 19,
`@tailwindcss/vite` declared), so `npm ci` failed outright with `EUSAGE` rather
than producing a broken build. `package.json` was rewritten to match the
versions the lockfile actually resolved, and the lockfile regenerated from it.

`react-router-dom` was already absent from `package.json` and only present in
the lockfile, so regenerating dropped it and with it all 15 advisories.
`npm audit` now reports zero without needing the upgrades in ticket 02.

Two items were not in the ticket but block the reproducibility claim:

- `.vite/deps/` was committed. It is Vite's dependency pre-bundle cache, a build
  artefact, and linting it failed on rules its bundled code references. Untracked
  and added to `.gitignore` and the ESLint ignore list.
- `framer-motion` stays for now: it is still imported by the components that
  ticket 05 deletes. Removing it belongs to that ticket, not this one.

Verified from a clean checkout with no `node_modules`: `npm ci`, `npm run build`
and `npm run lint` all exit 0, and `npm audit` reports 0 vulnerabilities.
