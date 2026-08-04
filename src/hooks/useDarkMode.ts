import { useEffect, useState } from 'react';
import { applyTheme, resolveTheme, type Theme } from '../theme';

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(resolveTheme);

  // The inline script in index.html applies the class before first paint in
  // production; this covers environments without it, such as tests.
  useEffect(() => {
    applyTheme(resolveTheme());
  }, []);

  const toggleDarkMode = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, { persist: true });
    setTheme(next);
  };

  return { isDarkMode: theme === 'dark', toggleDarkMode };
};
