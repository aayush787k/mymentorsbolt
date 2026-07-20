import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeName = 'light' | 'cyan-obsidian' | 'sunset' | 'emerald';

export const THEMES: {
  id: ThemeName;
  label: string;
  sub: string;
  swatch: string;
  ring: string;
}[] = [
  {
    id: 'light',
    label: 'Daylight',
    sub: 'Warm & clean',
    swatch: '#f8f7f4',
    ring: '#ea580c',
  },
  {
    id: 'cyan-obsidian',
    label: 'Neon Cyan',
    sub: 'Obsidian dark',
    swatch: '#0a0a0e',
    ring: '#00e5ff',
  },
  {
    id: 'sunset',
    label: 'Sunset Purple',
    sub: 'Hot-pink vibes',
    swatch: '#f0eefa',
    ring: '#ec4899',
  },
  {
    id: 'emerald',
    label: 'Lime Burst',
    sub: 'Emerald energy',
    swatch: '#e6fff0',
    ring: '#84cc16',
  },
];

type Ctx = { theme: ThemeName; setTheme: (t: ThemeName) => void };
const ThemeContext = createContext<Ctx>({ theme: 'light', setTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return 'light';
    return (localStorage.getItem('mmt-theme') as ThemeName) || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mmt-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
