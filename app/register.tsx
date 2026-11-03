import { useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

import { AuthButton } from "@/src/features/auth/components/AuthButton";
import { AuthField } from "@/src/features/auth/components/AuthField";
import {
  AuthScreenLayout,
  useAuthLayout,
} from "@/src/features/auth/components/AuthScreenLayout";
import { GoogleSignInButton } from "@/src/features/auth/components/GoogleSignInButton";
import { getClerkErrorMessage } from "@/src/features/auth/utils/clerkError";

export default function RegisterScreen() {
  const { signUp, fetchStatus } = useSignUp();
  const { compact } = useAuthLayout();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loading = fetchStatus === "fetching";

  async function handleSubmit() {
    if (loading) return;

    setError(null);

    const { error: createError } = await signUp.create({
      firstName: name.trim(),
      emailAddress: email.trim(),
      password,
    });

    if (createError) {
      setError(
        getClerkErrorMessage(
          createError,
          "No se pudo crear la cuenta. Revisa tus datos.",
        ),
      );
      return;
    }

    if (signUp.status === "complete") {
      const { error: finalizeError } = await signUp.finalize();

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
      return;
    }

    const { error: sendCodeError } = await signUp.verifications.sendEmailCode();

    if (sendCodeError) {
      setError(
        getClerkErrorMessage(
          sendCodeError,
          "No se pudo enviar el código de verificación.",
        ),
      );
      return;
    }

    setPendingVerification(true);
  }

  async function handleVerify() {
    if (loading) return;

    setError(null);

    const { error: verifyError } = await signUp.verifications.verifyEmailCode({
      code,
    });

    if (verifyError) {
      setError(getClerkErrorMessage(verifyError, "El código no es válido."));
      return;
    }

    if (signUp.status !== "complete") {
      setError("El código no es válido o la cuenta aún no está verificada.");
      return;
    }

    const { error: finalizeError } = await signUp.finalize();

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
      {pendingVerification ? (
        <>
          <Text
            className={`mb-4 text-center text-white ${
              compact ? "text-sm" : "text-base"
            }`}>
            Enviamos un código de verificación a {email.trim()}.
          </Text>
          <AuthField
            label="Código de verificación"
            placeholder="Ingrese el código"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            autoComplete="one-time-code"
            light
          />

          {error ? (
            <Text className="mb-2 text-center text-sm text-red-300">
              {error}
            </Text>
          ) : null}

          <AuthButton
            title="Verificar"
            onPress={handleVerify}
            loading={loading}
            disabled={!code.trim()}
          />
        </>
      ) : (
        <>
          <GoogleSignInButton disabled={loading} onError={setError} />

          <View className="my-4 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-white/25" />
            <Text className={`text-white/70 ${compact ? "text-xs" : "text-sm"}`}>
              o
            </Text>
            <View className="h-px flex-1 bg-white/25" />
          </View>

          <AuthField
            label="Nombre"
            placeholder="Ingrese su nombre"
            value={name}
            onChangeText={setName}
            autoComplete="name"
            light
          />
          <AuthField
            label="Correo Electrónico"
            placeholder="Ingrese su correo"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            light
          />
          <AuthField
            label="Contraseña"
            placeholder="Ingrese su contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="new-password"
            light
          />

          {error ? (
            <Text className="mb-2 text-center text-sm text-red-300">
              {error}
            </Text>
          ) : null}

          <AuthButton
            title="Registrarse"
            onPress={handleSubmit}
            loading={loading}
            disabled={!name.trim() || !email.trim() || !password}
          />

          <View className="mt-4 flex-row flex-wrap items-center justify-center">
            <Text className={`text-white ${compact ? "text-sm" : "text-base"}`}>
              ¿Ya tienes cuenta?   {"  "}
            </Text>
            <Link href="/login" asChild>
              <Text
                className={`font-bold text-white ${
                  compact ? "text-sm" : "text-base"
                }`}>
                Inicia sesión{"  "}
              </Text>
            </Link>
          </View>
        </>
      )}
    </AuthScreenLayout>
  );
}
