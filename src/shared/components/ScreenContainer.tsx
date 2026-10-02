import { Heading } from "@/components/ui/heading";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenContainerProps {
  title: string;
  children: React.ReactNode;
  showBackButton?: boolean;
}

export function ScreenContainer({
  title,
  children,
  showBackButton = false,
}: ScreenContainerProps) {
  const router = useRouter();

  return (
    // SafeAreaView de react-native-safe-area-context NO está envuelto por
    // NativeWind/react-native-css, así que su `className` se ignora en native.
    // flex-1 y el background se aplican por `style` inline para que la cadena
    // de altura no colapse (si no, el ScrollView hijo queda con altura 0).
    //
    // NO incluir "top": el `AppHeader` del tab navigator ya aplica
    // `paddingTop: insets.top`. Si aquí se repite, el inset superior se cuenta
    // dos veces (solo se nota en Android, donde el inset es > 0).
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f5f9" }}
      edges={["left", "right"]}>
      {/* Header fijo en JS (NO el toolbar nativo de Android).
          Usar el header nativo hacía que en Android creciera solo: el toolbar
          de androidx aplica el alto del status bar (hardcodeado con edge-to-edge
          en SDK 35) y usa `?attr/actionBarSize` como mínimo, además del
          `contentInsetStartWithNavigation` entre el botón atrás y el título.
          Renderizando el header en JS, web y Android quedan idénticos. */}
      <View className="w-full flex-row items-center gap-2 border-b border-slate-200 px-4 py-1 sm:px-6 sm:py-2 lg:px-8">
        {showBackButton ? (
          <Pressable
            onPress={() => {
              // Si se entró por deep link no hay historial: volvemos a la lista.
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/(tabs)/receipts");
              }
            }}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Volver"
            className="h-9 w-9 items-center justify-center rounded-full active:bg-slate-200">
            <Ionicons name="arrow-back" size={22} color="#0f172a" />
          </Pressable>
        ) : null}

        {/* 1. Heading Estático: flex-1 + min-w-0 permiten que títulos largos
            se ajusten/wrapeen en vez de desbordar en pantallas angostas.
            El margen superior/inferior ya lo neutraliza el propio componente
            Heading (ver components/ui/heading/index.tsx) para nativo y web. */}
        <Heading className="min-w-0 flex-1 text-2xl font-bold text-slate-900 sm:text-[28px] lg:text-[34px]">
          {title}
        </Heading>
      </View>

      {/* Contenedor dinámico donde se inyectarán las Cards u otros componentes */}
      <View className="w-full flex-1 px-4 pt-4 sm:px-6 sm:pt-5 lg:px-8">
        {children}
      </View>
    </SafeAreaView>
  );
}
