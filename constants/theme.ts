import { type StatusBarStyle } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  accentSoft: string;
  accentContrast: string;
  tabInactive: string;
};

export type AppTheme = {
  isDark: boolean;
  statusBar: StatusBarStyle;
  colors: ThemeColors;
};

export const themes = {
  light: {
    isDark: false,
    statusBar: 'dark',
    colors: {
      background: '#F7F4EE',
      surface: '#FFFFFF',
      surfaceMuted: '#F0ECE4',
      textPrimary: '#1F1A14',
      textSecondary: '#6E655A',
      border: '#DED7CB',
      accent: '#2D6A4F',
      accentSoft: '#E2EFE7',
      accentContrast: '#FFFFFF',
      tabInactive: '#8B8175',
    },
  },
  dark: {
    isDark: true,
    statusBar: 'light',
    colors: {
      background: '#0C0C09',
      surface: '#171712',
      surfaceMuted: '#20201A',
      textPrimary: '#F0EDE5',
      textSecondary: '#A19B8F',
      border: '#2A2A24',
      accent: '#8FD3AE',
      accentSoft: '#233127',
      accentContrast: '#09120D',
      tabInactive: '#74746A',
    },
  },
} as const satisfies Record<string, AppTheme>;

export function useAppTheme() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? themes.dark : themes.light;

  return { theme };
}