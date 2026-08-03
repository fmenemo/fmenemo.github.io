# Theming lives in Tailwind v4 CSS tokens, not JS ternaries

The site was themed by roughly eighty inline style ternaries of the form `style={{ color: isDarkMode ? '#ffffff' : '#000000' }}`, fed by a `useDarkMode` hook that mounted a `MutationObserver` on `<html>` in every component that called it (five observers for five components). Meanwhile `tailwind.config.js` defined a palette and font stack that had no effect at all, because Tailwind v4 with `@tailwindcss/vite` takes its configuration from CSS rather than that file. We decided to move the entire design system into `@theme` tokens in `src/index.css`, express dark mode with the `dark:` variant against a class on `<html>`, and delete the ternaries, because a redesign is not possible while the palette is scattered across eighty component-level literals.

## Consequences

- `tailwind.config.js` and `postcss.config.js` are to be deleted, along with the `autoprefixer` dependency. Under v4 they are inert; keeping them invites edits that silently do nothing.
- `useDarkMode` keeps the toggle and the `localStorage` persistence but loses the observer and the per-component state. Components read colours from CSS, not from React.
- An inline script in `index.html` sets the theme class before first paint. Previously `isDarkMode` initialised to `false`, so dark-mode visitors saw a flash of the light theme on every load.
- `framer-motion` is removed rather than upgraded. Its only use is the fade-up-and-stagger animations that the redesign deletes, and the few remaining hover transitions are plain CSS. This leaves React as the sole runtime dependency.
- Fonts are self-hosted woff2 subsets. The previous `index.html` loaded Inter from Google Fonts and "SF Pro Display" from a third-party CDN, neither of which was used by any rule, and SF Pro is not licensed for web redistribution.
