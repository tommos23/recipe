import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { type AppTheme, useAppTheme } from '@/constants/theme';

export default function NotFoundScreen() {
  const { theme } = useAppTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen does not exist.</Text>
      <Link href="/create" style={styles.link}>
        Go to home screen
      </Link>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  link: {
    color: theme.colors.accent,
  },
  });
