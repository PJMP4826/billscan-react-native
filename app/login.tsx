import { useSignIn } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { AuthButton } from "@/src/features/auth/components/AuthButton";
import { AuthField } from "@/src/features/auth/components/AuthField";
import {
  AuthScreenLayout,
  useAuthLayout,
} from "@/src/features/auth/components/AuthScreenLayout";
import { getClerkErrorMessage } from "@/src/features/auth/utils/clerkError";

export default function LoginScreen() {
  const { signIn, fetchStatus } = useSignIn();
  const { compact } = useAuthLayout();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const loading = fetchStatus === "fetching";

  async function handleSubmit() {
    if (loading) return;

    setError(null);

    const { error: createError } = await signIn.create({
      identifier: email.trim(),
      password,
    });

    if (createError) {
      setError(
        getClerkErrorMessage(createError, "Revisa tus datos e intenta de nuevo."),
      );
      return;
    }

    if (signIn.status !== "complete") {
      setError("No se pudo completar el inicio de sesión.");
      return;
    }

    const { error: finalizeError } = await signIn.finalize();

    if (finalizeError) {
      setError(
        getClerkErrorMessage(
          finalizeError,
          "No se pudo iniciar la sesión. Intenta de nuevo.",
        ),
      );
      return;
    }

    router.replace("/(tabs)");
  }

  return (
    <AuthScreenLayout>
      <AuthField
        label="Correo Electrónico"
        placeholder="Ingrese su correo"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <AuthField
        label="Contraseña"
        placeholder="Ingrese su contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoComplete="password"
      />

      {error ? (
        <Text className="mb-2 text-center text-sm text-red-300">{error}</Text>
      ) : null}

      <AuthButton
        title="Ingresar"
        onPress={handleSubmit}
        loading={loading}
        disabled={!email.trim() || !password}
      />

      <View className="mt-4 flex-row flex-wrap items-center justify-center">
        <Text className={`text-white ${compact ? "text-sm" : "text-base"}`}>
          ¿No tienes cuenta?{" "}
        </Text>
        <Link href="/register" asChild>
          <Text
            className={`font-bold text-white ${
              compact ? "text-sm" : "text-base"
            }`}>
            Regístrate
          </Text>
        </Link>
      </View>
    </AuthScreenLayout>
  );
}
