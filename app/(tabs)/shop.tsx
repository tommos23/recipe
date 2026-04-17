import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { SHOPPING_LIST, ShoppingItem } from '@/constants/dummyData';

const itemKey = (section: string, item: ShoppingItem) => `${section}-${item.name}-${item.size}`;

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
        const key = itemKey(title, item);
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
    const fresh = SHOPPING_LIST.SHOPPING_FRESH;
    const pantry = SHOPPING_LIST.SHOPPING_PANTRY;
    const all = [...fresh, ...pantry];
    const complete = [
      ...fresh.map((item) => itemKey('Fresh', item)),
      ...pantry.map((item) => itemKey('Pantry', item)),
    ].filter((key) => checked[key]).length;
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

const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sectionTitle: {
    color: theme.colors.textPrimary,
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
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    borderColor: theme.colors.accent,
    backgroundColor: theme.colors.accent,
  },
  checkboxTick: {
    color: theme.colors.accentContrast,
    fontWeight: '700',
  },
  itemBody: {
    flex: 1,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  itemName: {
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  itemDone: {
    textDecorationLine: 'line-through',
    color: theme.colors.textSecondary,
  },
  itemMeta: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
}));
