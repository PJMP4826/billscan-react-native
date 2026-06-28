import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import { WebCaptureModal } from "@/src/features/capture/components/WebCaptureModal";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

function IonIcon(props: { name: IoniconName; color: string }) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { triggerCapture } = useCaptureContext();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: useClientOnlyValue(false, true),

          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            borderRadius: 24,
            height: 70,
            backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#f1f1f1",
            borderTopWidth: 0,

            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 8,
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
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => <IonIcon name="grid" color={color} />,
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
          name="receipts"
          options={{
            title: "Tickets",
            tabBarIcon: ({ color }) => (
              <IonIcon name="receipt-outline" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="camera"
          options={{
            tabBarLabel: () => null,
            tabBarButton: () => (
              <Pressable
                onPress={triggerCapture}
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

        <Tabs.Screen
          name="invoices"
          options={{
            title: "Reportes",
            tabBarIcon: ({ color }) => (
              <IonIcon name="bar-chart-outline" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Perfil",
            tabBarIcon: ({ color }) => (
              <IonIcon name="person-outline" color={color} />
            ),
          }}
        />
      </Tabs>
      <WebCaptureModal />
    </>
  );
}
