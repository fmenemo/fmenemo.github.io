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
