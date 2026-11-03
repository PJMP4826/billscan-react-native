import { useSSO } from "@clerk/expo";
import * as AuthSession from "expo-auth-session";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable } from "react-native";
import { Path, Svg } from "react-native-svg";
import { Text } from "@/components/ui/text";

import { getClerkErrorMessage } from "../utils/clerkError";
import { useAuthLayout } from "./AuthScreenLayout";

const APP_SCHEME = "billscanreactnative";

function GoogleLogo({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  );
}

type GoogleSignInButtonProps = {
  disabled?: boolean;
  onError?: (message: string | null) => void;
};

export function GoogleSignInButton({
  disabled,
  onError,
}: GoogleSignInButtonProps) {
  const { startSSOFlow } = useSSO();
  const { compact } = useAuthLayout();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isDisabled = disabled || loading;

  useEffect(() => {
    if (Platform.OS !== "android") return;

    void WebBrowser.warmUpAsync();

    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);

  async function handlePress() {
    if (isDisabled) return;

    setLoading(true);
    onError?.(null);

    try {
      const redirectUrl = AuthSession.makeRedirectUri(
        Platform.OS === "web"
          ? { path: "sso-callback" }
          : { scheme: APP_SCHEME, path: "sso-callback" },
      );

      const { createdSessionId, setActive, authSessionResult } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl,
        });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
        return;
      }

      if (
        authSessionResult?.type === "cancel" ||
        authSessionResult?.type === "dismiss"
      ) {
        return;
      }

      onError?.(
        "La cuenta de Google se autenticó, pero falta completar el registro.",
      );
    } catch (error) {
      const code = (error as { code?: string | number } | undefined)?.code;

      if (code === "SIGN_IN_CANCELLED" || code === "-5") {
        return;
      }

      onError?.(
        getClerkErrorMessage(
          error,
          "No se pudo continuar con Google. Intenta de nuevo.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  const labelStyle = {
    color: "#1f1f1f",
    fontSize: compact ? 14 : 16,
    fontWeight: "500" as const,
    letterSpacing: 0.25,
    lineHeight: compact ? 20 : 24,
    ...(Platform.OS === "web"
      ? { fontFamily: "system-ui, -apple-system, sans-serif" }
      : null),
    ...(Platform.OS === "android"
      ? { includeFontPadding: false, textAlignVertical: "center" as const }
      : null),
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Continuar con Google"
      onPress={handlePress}
      disabled={isDisabled}
      className={`mt-2 flex-row items-center justify-center gap-3 rounded-xl border-0 bg-white ${
        compact ? "h-12 px-4" : "h-14 px-5"
      } ${isDisabled ? "opacity-60" : "active:bg-[#f8fafd]"}`}>
      {loading ? (
        <ActivityIndicator color="#4285F4" />
      ) : (
        <>
          <GoogleLogo size={compact ? 18 : 20} />
          <Text style={labelStyle}>Continuar con Google {""}</Text>
        </>
      )}
    </Pressable>
  );
}
