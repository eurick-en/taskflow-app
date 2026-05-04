import React, { createContext, useState } from 'react';

export type ThemeType = 'light' | 'dark';

export const themes = {
  light: {
    background: '#f5f5f5',
    card: '#ffffff',
    text: '#000',
    subText: '#555',
    primary: '#007bff',
    danger: '#dc3545',
    border: '#ddd',
  },
  dark: {
    background: '#121212',
    card: '#1e1e1e',
    text: '#fff',
    subText: '#aaa',
    primary: '#4dabf7',
    danger: '#ff6b6b',
    border: '#333',
  },
};

type ThemeContextType = {
  theme: ThemeType;
  colors: typeof themes.light;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};