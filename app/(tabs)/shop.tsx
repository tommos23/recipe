import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DARK_THEME, SHOPPING_LIST, ShoppingItem } from '@/constants/dummyData';

function Section({
  title,
  items,
  checked,
  onToggle,
}: {
  title: string;
  items: ShoppingItem[];
  checked: Record<string, boolean>;
  onToggle: (key: string) => void;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item) => {
        const key = `${title}-${item.name}`;
        const done = !!checked[key];
        return (
          <Pressable key={key} style={styles.item} onPress={() => onToggle(key)}>
            <View style={[styles.checkbox, done && styles.checkboxChecked]}>
              {done ? <Text style={styles.checkboxTick}>✓</Text> : null}
            </View>
            <View style={styles.itemBody}>
              <Text style={[styles.itemName, done && styles.itemDone]}>{item.name}</Text>
              <Text style={styles.itemMeta}>{item.size}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function ShopTab() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const totals = useMemo(() => {
    const all = [...SHOPPING_LIST.SHOPPING_FRESH, ...SHOPPING_LIST.SHOPPING_PANTRY];
    const complete = all.filter((item) => checked[`Fresh-${item.name}`] || checked[`Pantry-${item.name}`]).length;
    return { all: all.length, complete };
  }, [checked]);

  const toggle = (key: string) => {
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Shopping List</Text>
      <Text style={styles.subtitle}>
        {totals.complete}/{totals.all} items checked
      </Text>

      <Section title="Fresh" items={SHOPPING_LIST.SHOPPING_FRESH} checked={checked} onToggle={toggle} />
      <Section title="Pantry" items={SHOPPING_LIST.SHOPPING_PANTRY} checked={checked} onToggle={toggle} />
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
    paddingBottom: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: DARK_THEME.textPrimary,
  },
  subtitle: {
    color: DARK_THEME.textMuted,
  },
  section: {
    backgroundColor: DARK_THEME.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: DARK_THEME.border,
  },
  sectionTitle: {
    color: DARK_THEME.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderColor: DARK_THEME.textMuted,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: DARK_THEME.textPrimary,
    backgroundColor: DARK_THEME.textPrimary,
  },
  checkboxTick: {
    color: DARK_THEME.background,
    fontWeight: '700',
  },
  itemBody: {
    flex: 1,
    borderBottomColor: DARK_THEME.border,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  itemName: {
    color: DARK_THEME.textPrimary,
    fontWeight: '600',
  },
  itemDone: {
    textDecorationLine: 'line-through',
    color: DARK_THEME.textMuted,
  },
  itemMeta: {
    color: DARK_THEME.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
});
