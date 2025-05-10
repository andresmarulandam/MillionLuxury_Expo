import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { baseColors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { metrics } from './metrics';

export const theme = {
  colors: baseColors,
  typography,
  spacing,
  metrics,
  light: lightTheme,
  dark: darkTheme,
};

export { spacing, metrics, typography };
