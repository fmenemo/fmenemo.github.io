// Single home for the theme rule. The inline script in index.html mirrors
// resolveTheme/applyTheme in plain JS because it must run before any module
// loads; keep the two in sync.

export type Theme = 'light' | 'dark';

const isTheme = (value: unknown): value is Theme => value === 'light' || value === 'dark';

const storedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem('theme');
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
};

const systemTheme = (): Theme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// An explicit choice wins, otherwise the system setting.
export const resolveTheme = (): Theme => storedTheme() ?? systemTheme();

export const applyTheme = (theme: Theme, options?: { persist: boolean }) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  if (options?.persist) {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage blocked: the choice still applies for this page view.
    }
  }
};
