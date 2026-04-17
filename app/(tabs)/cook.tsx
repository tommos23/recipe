import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RECIPES } from '@/constants/dummyData';
import { type AppTheme, useAppTheme } from '@/constants/theme';

export default function CookTab() {
  const { theme } = useAppTheme();
  const styles = getStyles(theme);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {RECIPES.map((recipe) => (
        <Link key={recipe.id} href={{ pathname: '/cook/[id]', params: { id: recipe.id } }} asChild>
          <Pressable style={[styles.card, { borderLeftColor: theme.isDark ? recipe.lightAccent : recipe.accentColor }]}>
            <View style={styles.row}>
              <Text style={styles.emoji}>{recipe.emoji}</Text>
              <View style={styles.cardBody}>
                <Text style={styles.title}>{recipe.title}</Text>
                <Text style={styles.subtitle}>{recipe.subtitle}</Text>
              </View>
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  emoji: {
    fontSize: 28,
  },
  cardBody: {
    flex: 1,
  },
  title: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  });
