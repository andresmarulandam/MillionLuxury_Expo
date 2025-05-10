import { baseColors } from './colors';
import { typography } from './typography';

export type ThemeType = 'light' | 'dark';

export interface AppTheme {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  error: string;
  success: string;
  border: string;
  cryptoCard: string;
  cryptoCardBorder: string;
  priceUp: string;
  priceDown: string;
  marketCap: string;
  volume: string;
  chartLine: string;
  chartArea: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export type Typography = typeof typography;
export type Colors = typeof baseColors;
