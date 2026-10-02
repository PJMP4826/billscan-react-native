import { Heading } from "@/components/ui/heading";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#f1f5f9" }}
      edges={["top", "left", "right"]}>
      {/* Header fijo para todas las pantallas */}
      <View className="w-full flex-row items-center border-b border-slate-200 px-4 py-1 sm:px-6 sm:py-2 lg:px-8">
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
