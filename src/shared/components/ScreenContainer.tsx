import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Heading } from "@/components/ui/heading";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Asumiendo que usas expo-router

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
      <View className="flex-row items-center px-4 py-4 border-b border-slate-200">
        {showBackButton && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-3 p-1 rounded-full active:bg-slate-100">
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </TouchableOpacity>
        )}
        {/* 1. Heading Estático */}
        <View className="flex-row items-center justify-between">
          <Heading className="text-[24px] font-bold tracking-tight text-slate-900">
            {title}
          </Heading>
        </View>
      </View>

      {/* Contenedor dinámico donde se inyectarán las Cards u otros componentes */}
      <View className="flex-1 px-4 pt-5">{children}</View>
    </SafeAreaView>
  );
}
