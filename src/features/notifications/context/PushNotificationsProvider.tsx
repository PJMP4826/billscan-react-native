import { useAuth } from "@clerk/expo";
import { useRootNavigationState, useRouter, type Href } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Platform } from "react-native";

import { PushPermissionStatus } from "@/src/features/notifications/domain/enums/push-permission-status.enum";
import type { PushNotificationResponse } from "@/src/features/notifications/domain/ports/push-notifications.port";
import { createPushNotifications } from "@/src/features/notifications/infrastructure/factories/push-notifications.factory";
import { createPushTokenRegistration } from "@/src/features/notifications/infrastructure/factories/push-token-registration.factory";
import { mapNotificationPayloadToHref } from "@/src/features/notifications/infrastructure/mappers/notification-payload.mapper";
import { mapPlatformToPushPlatform } from "@/src/features/notifications/infrastructure/mappers/push-notification.mapper";
import { pushNotificationPayloadSchema } from "@/src/features/notifications/infrastructure/schemas/push-notification-payload.schema";

interface PushNotificationsContextValue {
  permissionStatus: PushPermissionStatus;
  expoPushToken: string | null;
}

const PushNotificationsContext =
  createContext<PushNotificationsContextValue | null>(null);

export function PushNotificationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const notifications = useMemo(createPushNotifications, []);
  const registration = useMemo(createPushTokenRegistration, []);

  const [permissionStatus, setPermissionStatus] =
    useState<PushPermissionStatus>(PushPermissionStatus.UNDETERMINED);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  const currentTokenRef = useRef<string | null>(null);
  const registrationInFlightRef = useRef(false);
  const signedInRef = useRef(isSignedIn);
  const routerRef = useRef(router);
  const pendingHrefRef = useRef<Href | null>(null);
  const handledResponseKeyRef = useRef<string | null>(null);

  useEffect(() => {
    signedInRef.current = isSignedIn;
  }, [isSignedIn]);

  useEffect(() => {
    routerRef.current = router;
  }, [router]);

  const handleNotificationResponse = useCallback(
    (response: PushNotificationResponse) => {
      const responseKey = response.identifier;
      if (handledResponseKeyRef.current === responseKey) return;
      handledResponseKeyRef.current = responseKey;

      const parsed = pushNotificationPayloadSchema.safeParse(response.data);
      if (!parsed.success) return;

      const href = mapNotificationPayloadToHref(parsed.data);
      if (!href) return;

      if (!signedInRef.current) {
        pendingHrefRef.current = href;
        return;
      }

      routerRef.current.push(href);
    },
    [],
  );

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;
    if (registrationInFlightRef.current) return;

    let cancelled = false;
    registrationInFlightRef.current = true;

    const register = async () => {
      try {
        await notifications.ensureChannel();

        let status = await notifications.getPermissionStatus();
        if (status === PushPermissionStatus.UNDETERMINED) {
          status = await notifications.requestPermission();
        }

        if (cancelled) return;
        setPermissionStatus(status);

        if (status !== PushPermissionStatus.GRANTED) return;

        const token = await notifications.getPushToken();
        if (cancelled || !token) return;

        currentTokenRef.current = token;
        setExpoPushToken(token);

        if (Platform.OS === "android" || Platform.OS === "ios") {
          await registration.register(
            token,
            mapPlatformToPushPlatform(Platform.OS),
          );
        }
      } catch (error) {
        if (__DEV__) {
          console.warn("[push] No se pudo registrar la notificación:", error);
        }
      } finally {
        registrationInFlightRef.current = false;
      }
    };

    void register();

    return () => {
      cancelled = true;
      registrationInFlightRef.current = false;
    };
  }, [isLoaded, isSignedIn, notifications, registration]);

  useEffect(() => {
    if (!isLoaded || isSignedIn) return;

    const token = currentTokenRef.current;
    if (!token) return;

    currentTokenRef.current = null;
    setExpoPushToken(null);
    void registration.unregister(token).catch(() => {
      if (__DEV__) {
        console.warn("[push] No se pudo desregistrar el token.");
      }
    });
  }, [isLoaded, isSignedIn, registration]);

  useEffect(() => {
    const detach = notifications.attachListeners({
      onNotificationResponse: handleNotificationResponse,
    });

    try {
      const response = notifications.getLastResponse();
      if (response) {
        handleNotificationResponse(response);
        notifications.clearLastResponse();
      }
    } catch (error) {
      if (__DEV__) {
        console.warn(
          "[push] No se pudo leer la última notificación:",
          error,
        );
      }
    }

    return () => detach();
  }, [handleNotificationResponse, notifications]);

  useEffect(() => {
    if (!isSignedIn || !rootNavigationState?.key) return;

    const href = pendingHrefRef.current;
    if (!href) return;

    pendingHrefRef.current = null;
    router.push(href);
  }, [isSignedIn, rootNavigationState?.key, router]);

  const value = useMemo(
    () => ({ permissionStatus, expoPushToken }),
    [permissionStatus, expoPushToken],
  );

  return (
    <PushNotificationsContext.Provider value={value}>
      {children}
    </PushNotificationsContext.Provider>
  );
}

export function usePushNotifications(): PushNotificationsContextValue {
  const context = useContext(PushNotificationsContext);
  if (!context) {
    throw new Error(
      "usePushNotifications must be used within PushNotificationsProvider",
    );
  }
  return context;
}
