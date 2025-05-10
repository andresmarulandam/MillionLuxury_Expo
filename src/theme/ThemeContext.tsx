import { createContext, useEffect, useState } from 'react';
import { lightTheme } from './lightTheme';
import { ThemeType } from './types';
import { useColorScheme } from 'react-native';
import { darkTheme } from './darkTheme';
import { baseColors } from './colors';

export const ThemeContext = createContext({
  theme: lightTheme,
  colors: baseColors,
  mode: 'light' as ThemeType,
  setMode: (mode: ThemeType) => {},
  toggleMode: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<ThemeType>(
    systemTheme === 'dark' ? 'dark' : 'light',
  );

  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const isDark = mode === 'dark';

  const toggleMode = () =>
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    if (systemTheme) setMode(systemTheme);
  }, [systemTheme]);

  return (
    <ThemeContext.Provider
      value={{ theme, colors: baseColors, mode, setMode, toggleMode, isDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
