import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { DARK_THEME } from '@/constants/dummyData';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen does not exist.</Text>
      <Link href="/create" style={styles.link}>
        Go to home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: DARK_THEME.textPrimary,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  link: {
    color: DARK_THEME.textMuted,
  },
});
