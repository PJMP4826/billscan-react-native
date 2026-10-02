import { AppHeader } from "@/components/AppHeader";
import { FiscalInfoSetupModal } from "@/src/features/fiscal-info/components/FiscalInfoSetupModal";
import { useFiscalInfoSetup } from "@/src/features/fiscal-info/infrastructure/hooks/useFiscalInfoSetup";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { ColorValue, Pressable, View } from "react-native";

import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { CaptureBillingModal } from "@/src/features/capture/components/CaptureBillingModal";
import { CaptureUploadResponseModal } from "@/src/features/capture/components/CaptureUploadResponseModal";
import { WebCaptureModal } from "@/src/features/capture/components/WebCaptureModal";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];
type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

function IonIcon(props: { name: IoniconName; color: ColorValue }) {
  return <Ionicons size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { triggerCapture } = useCaptureContext();
  const { needsSetup, isLoading, submit, isSubmitting, submitSuccess } =
    useFiscalInfoSetup();
  const insets = useSafeAreaInsets();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor:
            Colors[colorScheme === "dark" ? "dark" : "light"].tint,
          headerShown: true,
          header: () => <AppHeader />,

          tabBarStyle: {
            height: 80 + insets.bottom,
            paddingTop: 8,
            borderRadius: 26,
            backgroundColor: colorScheme === "dark" ? "#1c1c1e" : "#E8E8E8",
            borderTopWidth: 0,
            paddingBottom: 10 + insets.bottom,
            boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
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
                    backgroundColor: "#1E40AF",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 2px 3px rgba(0, 0, 0, 0.2)",
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
      <CaptureBillingModal />
      <CaptureUploadResponseModal />
      <FiscalInfoSetupModal
        visible={needsSetup && !isLoading}
        onSubmit={submit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
