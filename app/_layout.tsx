import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAppTheme } from '@/constants/theme';

export default function RootLayout() {
  const { theme } = useAppTheme();

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.background },
          headerTintColor: theme.colors.textPrimary,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="cook/[id]" options={{ title: 'Recipe' }} />
      </Stack>
    </>
  );
}
