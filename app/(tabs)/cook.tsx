import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DARK_THEME, RECIPES } from '@/constants/dummyData';

export default function CookTab() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {RECIPES.map((recipe) => (
        <Link key={recipe.id} href={{ pathname: '/cook/[id]', params: { id: recipe.id } }} asChild>
          <Pressable style={[styles.card, { borderLeftColor: recipe.lightAccent }]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  card: {
    backgroundColor: DARK_THEME.surface,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
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
    color: DARK_THEME.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
  subtitle: {
    color: DARK_THEME.textMuted,
    marginTop: 4,
  },
});
