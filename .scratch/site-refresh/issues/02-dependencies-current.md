# 02: Dependencies current, audit clean

**What to build:** The repo reports zero known vulnerabilities and runs on current versions of everything. Today there are 15 open advisories, all dev-time, and majors available across the build toolchain.

**Blocked by:** 01 (Reproducible build). The manifest has to describe reality before upgrading it means anything.

**Status:** ready-for-agent

- [ ] Every dependency is at its latest version
- [ ] The TypeScript major upgrade is a separate commit within this ticket, since a two-major jump is the change most likely to surface real type errors
- [ ] Any type errors surfaced by that upgrade are fixed properly, not suppressed with `any` or ignore comments
- [ ] `npm audit` reports zero vulnerabilities
- [ ] `npm run build` succeeds after each upgrade commit, not only at the end
- [ ] `npm run lint` passes, with any new lint rules from major upgrades either satisfied or deliberately configured
- [ ] The rendered site is unchanged by this ticket: upgrades only, no behaviour or appearance changes
