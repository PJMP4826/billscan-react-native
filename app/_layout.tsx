import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import Head from "expo-router/head";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import { useEffect, type ReactNode } from "react";
import "react-native-reanimated";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/src/shared/infrastructure/query/query-client";

import { useColorScheme } from "@/components/useColorScheme";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { ActivityIndicator, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Agrega EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY al archivo .env.local",
  );
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
import { CaptureProvider } from "@/src/features/capture/context/CaptureContext";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ duration: 500, fade: true });
WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <GluestackUIProvider mode="light">
          <QueryClientProvider client={queryClient}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              <CaptureProvider>
                <Head>
                  <title>BillScan</title>
                  <meta
                    name="description"
                    content="Escanea y gestiona tus facturas de forma rápida."
                  />
                </Head>
                <AuthGate>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="login"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="register"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="sso-callback"
                      options={{ headerShown: false, animation: "none" }}
                    />
                    <Stack.Screen
                      name="modal"
                      options={{ presentation: "modal" }}
                    />
                  </Stack>
                </AuthGate>
              </CaptureProvider>
            </ThemeProvider>
          </QueryClientProvider>
        </GluestackUIProvider>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}

function AuthGate({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const isAuthRoute =
    segments[0] === "login" ||
    segments[0] === "register" ||
    segments[0] === "sso-callback";

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn && !isAuthRoute) {
      router.replace("/login");
    } else if (isSignedIn && isAuthRoute) {
      router.replace("/(tabs)");
    }
  }, [isLoaded, isSignedIn, isAuthRoute, router]);

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-[#275fa9]">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return <>{children}</>;
}
