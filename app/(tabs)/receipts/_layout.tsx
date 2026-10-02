import { Stack } from "expo-router";

export default function GastosLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* El header de "[id]" se renderiza en JS vía `ScreenContainer`
          (ver app/(tabs)/receipts/[id].tsx). El header nativo de Android
          crecía solo por edge-to-edge + `?attr/actionBarSize`; en JS web y
          Android quedan idénticos. */}
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
