import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { PushPermissionStatus } from "@/src/features/notifications/domain/enums/push-permission-status.enum";
import type {
  PushNotificationListeners,
  PushNotificationResponse,
  PushNotificationsPort,
} from "@/src/features/notifications/domain/ports/push-notifications.port";
import {
  NOTIFICATION_CHANNEL_ID,
  NOTIFICATION_CHANNEL_NAME,
  NOTIFICATION_COLOR,
} from "@/src/features/notifications/infrastructure/constants/notification.constants";
import {
  mapExpoNotificationResponseToDomain,
  mapExpoNotificationToDomain,
  mapPermissionStatusToPushPermissionStatus,
} from "@/src/features/notifications/infrastructure/mappers/push-notification.mapper";

export class PushNotificationsAdapter implements PushNotificationsPort {
  async ensureChannel(): Promise<void> {
    if (Platform.OS !== "android") return;

    await Notifications.setNotificationChannelAsync(NOTIFICATION_CHANNEL_ID, {
      name: NOTIFICATION_CHANNEL_NAME,
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: NOTIFICATION_COLOR,
    });
  }

  async getPermissionStatus(): Promise<PushPermissionStatus> {
    const permissions = await Notifications.getPermissionsAsync();
    return mapPermissionStatusToPushPermissionStatus(permissions.status);
  }

  async requestPermission(): Promise<PushPermissionStatus> {
    const permissions = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: false,
        allowSound: true,
      },
    });
    return mapPermissionStatusToPushPermissionStatus(permissions.status);
  }

  async getPushToken(): Promise<string | null> {
    if (!Device.isDevice) return null;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ??
      Constants.easConfig?.projectId;

    if (!projectId) {
      if (__DEV__) {
        console.warn("[push] No se encontró el projectId de EAS.");
      }
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  }

  attachListeners(listeners: PushNotificationListeners): () => void {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        listeners.onNotificationReceived?.(
          mapExpoNotificationToDomain(notification),
        );
      },
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        listeners.onNotificationResponse?.(
          mapExpoNotificationResponseToDomain(response),
        );
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }

  getLastResponse(): PushNotificationResponse | null {
    const response = Notifications.getLastNotificationResponse();
    return response
      ? mapExpoNotificationResponseToDomain(response)
      : null;
  }

  clearLastResponse(): void {
    Notifications.clearLastNotificationResponse();
  }
}
