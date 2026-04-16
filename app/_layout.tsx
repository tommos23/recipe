import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { DARK_THEME } from '@/constants/dummyData';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: DARK_THEME.background },
          headerTintColor: DARK_THEME.textPrimary,
          contentStyle: { backgroundColor: DARK_THEME.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cook/[id]" options={{ title: 'Recipe' }} />
      </Stack>
    </>
  );
}
