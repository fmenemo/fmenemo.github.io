# 02: Dependencies current, audit clean

**What to build:** The repo reports zero known vulnerabilities and runs on current versions of everything. Today there are 15 open advisories, all dev-time, and majors available across the build toolchain.

**Blocked by:** 01 (Reproducible build). The manifest has to describe reality before upgrading it means anything.

**Status:** resolved

- [x] Every dependency is at its latest version, with one recorded exception: TypeScript (see comments)
- [x] The TypeScript major upgrade is a separate commit within this ticket, since a two-major jump is the change most likely to surface real type errors
- [x] Any type errors surfaced by that upgrade are fixed properly, not suppressed with `any` or ignore comments
- [x] `npm audit` reports zero vulnerabilities
- [x] `npm run build` succeeds after each upgrade commit, not only at the end
- [x] `npm run lint` passes, with any new lint rules from major upgrades either satisfied or deliberately configured
- [x] The rendered site is unchanged by this ticket: upgrades only, no behaviour or appearance changes

## Comments

Landed as three commits, each verified with `npm run build` and `npm run lint`:

1. Vite 6 to 8, `@vitejs/plugin-react` 4 to 6.
2. ESLint 9 to 10, `@eslint/js`, `eslint-plugin-react-hooks` 5 to 7,
   `eslint-plugin-react-refresh` 0.4 to 0.5, `globals` 15 to 17, `typescript-eslint`.
3. TypeScript 5.7.3 to 6.0.3.

**TypeScript is pinned at 6.0.3, not the latest 7.0.2.** TypeScript 7 typechecks
this repo cleanly (`tsc -b --force` exits 0), but `typescript-eslint` refuses to
load against it: its peer range is `>=4.8.4 <6.1.0`, and upstream support is
only tracked for TS >=7.1. Fran chose to pin rather than run a second aliased
TypeScript install purely for the linter. The range is `~6.0.3`, not `^6.0.3`,
so a 6.1 minor cannot silently break lint. Dependabot will re-raise TS 7 once
typescript-eslint supports it.

The ESLint 10 upgrade surfaced one real error: the new
`react-hooks/set-state-in-effect` rule fired on `useDarkMode`, which called
`setIsDarkMode` synchronously in an effect body. Fixed properly by seeding the
state from the preference in the `useState` initialiser and having the effect
only apply the class, not suppressed. The `MutationObserver` stays for now:
removing it belongs to ticket 04. Side effect worth noting: the toggle icon no
longer renders one frame in the wrong state on load.

Vite 8 shrank the built CSS from 41.67 kB to 25.68 kB raw, but gzip moved only
5.43 to 5.25 kB, which is a minifier change rather than lost styles.

Verified beyond the ticket: `npm ci && npm run build && npm run lint` from a
fresh clone of this branch with no `node_modules`, `npm audit` reporting zero,
and full-page screenshots of the before and after builds served side by side.
The two are identical at 1280px wide, same page height, no console errors; the
only pixel difference is the frame of the animated decorative circle.
