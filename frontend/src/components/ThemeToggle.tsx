import React, { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const ThemeToggle: React.FC = () => {
  const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    return storedTheme && ['light', 'dark'].includes(storedTheme) ? storedTheme : 'system';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const setMode = (mode: Theme) => {
    setTheme(mode);
    localStorage.setItem('theme', mode);
    document.documentElement.className = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : mode;
  };

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => setMode('system');
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="flex gap-1 align-start">
      {['light', 'dark', 'system'].map((mode) => (
        <button
          key={mode}
          onClick={() => setMode(mode as Theme)}
          className={`px-2 py-1.5 leading-none rounded-lg justify-center items-center gap-2.5 flex text-xs transition-background duration-300 ${theme === mode ? 'bg-upsun-violet-600 text-white' : 'bg-none text-upsun-black-300 border-2 border-transparent'} hover:border-[#3a2a99] hover:bg-[#3a2a99] hover:text-white`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
