import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Workbox } from "workbox-window";

const isProduction = process.env.NODE_ENV === "production";

export function ServiceWorkerUpdatePrompt() {
  const workboxRef = useRef<Workbox | null>(null);
  const updatingRef = useRef(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (
      !isProduction ||
      typeof navigator === "undefined" ||
      !("serviceWorker" in navigator)
    ) {
      return;
    }

    const workbox = new Workbox("/sw.js");
    let isMounted = true;

    const handleWaiting = () => {
      if (isMounted) setIsWaiting(true);
    };

    const handleControlling = () => {
      if (isMounted && updatingRef.current) {
        window.location.reload();
      }
    };

    workbox.addEventListener("waiting", handleWaiting);
    workbox.addEventListener("controlling", handleControlling);
    workboxRef.current = workbox;

    void workbox.register().catch((error) => {
      console.error("No se pudo registrar el service worker.", error);
    });

    return () => {
      isMounted = false;
      workbox.removeEventListener("waiting", handleWaiting);
      workbox.removeEventListener("controlling", handleControlling);
      workboxRef.current = null;
    };
  }, []);

  const handleUpdate = () => {
    if (updatingRef.current) return;

    updatingRef.current = true;
    workboxRef.current?.messageSkipWaiting();
  };

  if (!isWaiting) {
    return null;
  }

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.banner}>
        <Text style={styles.message}>
          Hay una nueva versión de BillScan disponible.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={handleUpdate}
          style={styles.button}>
          <Text style={styles.buttonText}>Actualizar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    bottom: 16,
    left: 16,
    zIndex: 9999,
  },
  banner: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    width: "100%",
    maxWidth: 520,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#0c356a",
    boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.25)",
  },
  message: {
    flex: 1,
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },
  buttonText: {
    color: "#0c356a",
    fontSize: 14,
    fontWeight: "700",
  },
});
