import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    try {
      const stored = localStorage.getItem('sp-theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // fallback
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sp-theme', theme);
    } catch {
      // localStorage may fail in private mode
    }

    const tc = document.getElementById('tc');
    if (tc) {
      tc.setAttribute('content', theme === 'light' ? '#f4f7fd' : '#050c2b');
    }
  }, [theme]);

  // Listen to OS preference change if user hasn't explicitly set a preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const handler = (e: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem('sp-theme');
      } catch {
        // ignore
      }
      if (!stored) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    };
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme };
}
