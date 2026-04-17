import 'react-native-unistyles';

import { themes } from './app/theme';

type AppThemes = typeof themes;

declare module 'react-native-unistyles' {
  interface UnistylesThemes extends AppThemes {}
}
