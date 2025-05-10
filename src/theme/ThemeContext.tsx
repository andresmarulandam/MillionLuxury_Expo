import { createContext, useEffect, useState } from 'react';
import { lightTheme } from './lightTheme';
import { ThemeType } from './types';
import { useColorScheme } from 'react-native';
import { darkTheme } from './darkTheme';

const ThemeContext = createContext({
  theme: lightTheme,
  mode: 'ligth' as ThemeType,
  setMode: (mode: ThemeType) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<ThemeType>(
    systemTheme === 'dark' ? 'dark' : 'light',
  );

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    if (systemTheme) setMode(systemTheme);
  }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
