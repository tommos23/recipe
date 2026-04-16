import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DARK_THEME, DEFAULT_SELECTED_THEME_TAGS, THEME_TAGS } from '@/constants/dummyData';

export default function CreateTab() {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARK_THEME.background,
    padding: 20,
    paddingBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
  },
  subtitle: {
    marginTop: 6,
    color: DARK_THEME.textMuted,
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 20,
  },
  tag: {
    backgroundColor: DARK_THEME.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minWidth: '46%',
  },
  tagActive: {
    borderColor: DARK_THEME.textPrimary,
    backgroundColor: '#20201A',
  },
  tagLabel: {
    color: DARK_THEME.textMuted,
    fontWeight: '600',
  },
  tagLabelActive: {
    color: DARK_THEME.textPrimary,
  },
  primaryButton: {
    marginTop: 'auto',
    borderRadius: 14,
    backgroundColor: DARK_THEME.textPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primaryButtonText: {
    color: DARK_THEME.background,
    fontWeight: '700',
    fontSize: 16,
  },
});
