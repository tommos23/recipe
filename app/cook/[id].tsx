import { useMemo, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { RECIPES } from '@/constants/dummyData';
import { type AppTheme, useAppTheme } from '@/constants/theme';

type Segment = 'Ingredients' | 'Method';

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = useMemo(() => RECIPES.find((item) => item.id === id), [id]);
  const [activeSegment, setActiveSegment] = useState<Segment>('Ingredients');
  const [doneSteps, setDoneSteps] = useState<Record<number, boolean>>({});
  const { theme } = useAppTheme();
  const styles = getStyles(theme);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Recipe not found.</Text>
      </View>
    );
  }

  const toggleStep = (index: number) => {
    setDoneSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.hero, { borderColor: theme.isDark ? recipe.lightAccent : recipe.accentColor }]}>
        <Text style={styles.emoji}>{recipe.emoji}</Text>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.subtitle}>{recipe.subtitle}</Text>
      </View>

      <View style={styles.segmentRow}>
        {(['Ingredients', 'Method'] as Segment[]).map((segment) => {
          const active = segment === activeSegment;
          return (
            <Pressable
              key={segment}
              style={[styles.segment, active && styles.segmentActive]}
              onPress={() => setActiveSegment(segment)}
            >
              <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{segment}</Text>
            </Pressable>
          );
        })}
      </View>

      {activeSegment === 'Ingredients' ? (
        <View style={styles.card}>
          {recipe.ingredients.map((ingredient) => (
            <Text key={ingredient} style={styles.lineItem}>• {ingredient}</Text>
          ))}
        </View>
      ) : (
        <View style={styles.card}>
          {recipe.steps.map((step, index) => {
            const done = !!doneSteps[index];
            return (
              <Pressable key={`${recipe.id}-${index}`} style={styles.step} onPress={() => toggleStep(index)}>
                <View style={[styles.checkbox, done && styles.checkboxChecked]}>
                  {done ? <Text style={styles.checkboxTick}>✓</Text> : null}
                </View>
                <View style={styles.stepBody}>
                  <Text style={[styles.stepTitle, done && styles.stepDone]}>{step.title}</Text>
                  <Text style={styles.stepText}>{step.text}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}

      <View style={styles.tipBox}>
        <Text style={styles.tipLabel}>Tip</Text>
        <Text style={styles.tipText}>{recipe.tip}</Text>
      </View>
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
    gap: 14,
  },
  hero: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    marginTop: 6,
  },
  segmentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  segment: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  segmentActive: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentSoft,
  },
  segmentText: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  segmentTextActive: {
    color: theme.colors.textPrimary,
  },
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    gap: 10,
  },
  lineItem: {
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
  step: {
    flexDirection: 'row',
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accent,
  },
  checkboxTick: {
    color: theme.colors.accentContrast,
    fontWeight: '700',
  },
  stepBody: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: 8,
  },
  stepTitle: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
  },
  stepDone: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  stepText: {
    color: theme.colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  tipBox: {
    backgroundColor: theme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
  },
  tipLabel: {
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  tipText: {
    color: theme.colors.textPrimary,
    marginTop: 6,
    lineHeight: 20,
  },
  empty: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    padding: 20,
  },
  });
