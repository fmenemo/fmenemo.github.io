# 04: Theming architecture

**What to build:** The design lives in one place instead of being scattered across roughly eighty inline colour ternaries inside components. A visitor should notice two improvements: dark mode no longer flashes a light page on load, and fonts render without waiting on a third-party server. Otherwise the site looks broadly as it did. This ticket changes where the design lives, not what it looks like.

See ADR 0002 for why.

**Blocked by:** 03 (Test seam, and fabricated content removed). Deleting content first means fewer call sites to migrate.

**Status:** ready-for-agent

- [ ] The palette, type scale and spacing rhythm are defined as Tailwind v4 `@theme` tokens in the stylesheet
- [ ] Dark mode is expressed with the `dark:` variant against a class on the document element
- [ ] No component decides a colour in JavaScript: every inline colour ternary is gone
- [ ] The theme hook keeps the toggle and the persisted choice, and loses the `MutationObserver` and per-component theme state
- [ ] A small inline script in the HTML entry sets the theme class before first paint, so a dark-mode visitor never sees a light flash
- [ ] The system colour-scheme preference is respected on first visit, and an explicit choice overrides it and persists
- [ ] Body and heading fonts, plus a monospace face for metadata, are self-hosted as subset woff2 files
- [ ] Existing tests still pass, and the theme toggle behaviour is covered at the existing seam
- [ ] `npm run build` and `npm run lint` pass

## Notes carried in from ticket 02

Review of the ESLint 10 lint fix in `useDarkMode` surfaced three things to
collapse when this ticket rewrites the hook, rather than patch in isolation now:

- The rule for "what the theme is" is encoded in three shapes: the reader
  (`prefersDarkMode`), the applier (`classList.toggle`), and the writer inside
  `toggleDarkMode`, which sets the class and `localStorage` through a separate
  path. The pre-paint inline script this ticket adds would make a fourth. One
  `applyTheme(mode)` shared by all of them is the fix.
- There is no `Theme = 'light' | 'dark'` type. The theme is a `localStorage`
  string, a boolean and a class name, and `localStorage.theme` is untyped index
  access, so a typo writes a silently invalid theme.
- `prefersDarkMode()` now runs during render in every component using the hook,
  and again in each mount effect, each re-deriving state from `localStorage`.
  That is correct only because `toggleDarkMode` always writes both stores.
- `checkDarkMode` does not check anything; it syncs React state from the DOM
  class. Name it for that if it survives.
