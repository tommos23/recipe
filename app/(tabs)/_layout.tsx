import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { DARK_THEME } from '@/constants/dummyData';

const CREATE_ROUTE = 'create';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName={CREATE_ROUTE}
      screenOptions={{
        tabBarStyle: { backgroundColor: DARK_THEME.surface, borderTopColor: DARK_THEME.border },
        tabBarActiveTintColor: DARK_THEME.textPrimary,
        tabBarInactiveTintColor: DARK_THEME.textMuted,
        headerStyle: { backgroundColor: DARK_THEME.background },
        headerTintColor: DARK_THEME.textPrimary,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color, size }) => <Ionicons name="sparkles-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => <Ionicons name="basket-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cook"
        options={{
          title: 'Cook',
          tabBarIcon: ({ color, size }) => <Ionicons name="flame-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
