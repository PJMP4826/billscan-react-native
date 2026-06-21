import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),

        // ==========================================
        // DISEÑO ESTILO DOCK FLOTANTE CON SOMBRAS
        // ==========================================
        tabBarStyle: {
          position: "absolute",
          bottom: 25, // Un poco más arriba para lucir como la imagen
          left: 20,
          right: 20,
          borderRadius: 24, // Bordes más redondeados tipo píldora
          height: 70, // Altura ideal para albergar el botón central
          backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#ffffff",
          borderTopWidth: 0,

          // Sombras pronunciadas para diferenciar el dock del fondo
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 8, // Sombra marcada en Android
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginBottom: 10,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}>
      {/* Pestaña Izquierda */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          tabBarLabel: () => null,
          tabBarButton: ({ ref, ...props }) => (
            <Pressable
              {...props}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}>
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  backgroundColor: "#3b42e4",
                  justifyContent: "center",
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  elevation: 3,
                }}>
                <FontAwesome name="camera" size={22} color="#ffffff" />
              </View>
            </Pressable>
          ),
        }}
      />

      {/* Pestaña Derecha */}
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
