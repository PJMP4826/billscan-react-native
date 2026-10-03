import { Stack } from "expo-router";

export default function GastosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* El detalle usa el header en JS de `ScreenContainer` (idéntico en web
          y Android). Con el header nativo, el toolbar de androidx crecía en
          Android por el inset del status bar, `?attr/actionBarSize` y
          `contentInsetStartWithNavigation`. */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
