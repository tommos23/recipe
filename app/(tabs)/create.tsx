import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DEFAULT_SELECTED_THEME_TAGS, THEME_TAGS } from '@/constants/dummyData';
import { type AppTheme, useAppTheme } from '@/constants/theme';

export default function CreateTab() {
  const { theme } = useAppTheme();
  const styles = getStyles(theme);
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED_THEME_TAGS);

  const toggleTag = (tag: string) => {
    setSelected((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theme Tags</Text>
      <Text style={styles.subtitle}>Select preferences for your weeknight meal pack.</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {THEME_TAGS.map((tag) => {
          const active = selected.includes(tag);
          return (
            <Pressable
              key={tag}
              onPress={() => toggleTag(tag)}
              style={[styles.tag, active && styles.tagActive]}
            >
              <Text style={[styles.tagLabel, active && styles.tagLabelActive]}>{tag}</Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Generate Meal Pack</Text>
      </Pressable>
    </View>
  );
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    marginTop: 6,
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 20,
  },
  tag: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minWidth: '46%',
  },
  tagActive: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accentSoft,
  },
  tagLabel: {
    color: theme.colors.textSecondary,
    fontWeight: '600',
  },
  tagLabelActive: {
    color: theme.colors.textPrimary,
  },
  primaryButton: {
    marginTop: 'auto',
    borderRadius: 14,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    color: theme.colors.accentContrast,
    fontWeight: '700',
    fontSize: 16,
  },
  });
