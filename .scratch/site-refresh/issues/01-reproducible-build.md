# 01: Reproducible build

**What to build:** A clean checkout of this repo installs and builds successfully. Today it does not: `package.json` declares React 18 while React 19 is installed, omits the Tailwind Vite plugin that the Vite config imports, and omits an installed router, so `npm ci` on a fresh machine produces a build that fails. After this ticket, the manifest describes the application that actually runs, and dependency updates are watched automatically.

**Blocked by:** None, can start immediately.

**Status:** ready-for-agent

- [ ] `package.json` lists exactly the dependencies the application imports, at the versions actually in use
- [ ] The Tailwind Vite plugin used by the build config is declared as a dependency
- [ ] `react-router-dom` is removed: it is installed, imported nowhere, and carries a high-severity advisory
- [ ] The package name reflects this project rather than a leftover scaffold name
- [ ] The lockfile is regenerated from the corrected manifest and committed
- [ ] `npm ci && npm run build` succeeds from a clean checkout with no `node_modules`
- [ ] `npm run lint` passes
- [ ] Dependabot is configured to watch npm dependencies
- [ ] No CI workflow is added: this is a deliberate decision, not an omission
