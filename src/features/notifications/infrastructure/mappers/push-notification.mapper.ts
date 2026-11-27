import * as Notifications from "expo-notifications";

import { PushPermissionStatus } from "@/src/features/notifications/domain/enums/push-permission-status.enum";
import { PushPlatform } from "@/src/features/notifications/domain/enums/push-platform.enum";
import type {
  PushNotificationResponse,
  ReceivedPushNotification,
} from "@/src/features/notifications/domain/ports/push-notifications.port";

export function mapPermissionStatusToPushPermissionStatus(
  status: Notifications.PermissionStatus,
): PushPermissionStatus {
  switch (status) {
    case Notifications.PermissionStatus.GRANTED:
      return PushPermissionStatus.GRANTED;
    case Notifications.PermissionStatus.UNDETERMINED:
      return PushPermissionStatus.UNDETERMINED;
    default:
      return PushPermissionStatus.DENIED;
  }
}

export function mapPlatformToPushPlatform(
  platform: "android" | "ios",
): PushPlatform {
  return platform === "android" ? PushPlatform.ANDROID : PushPlatform.IOS;
}

export function mapExpoNotificationToDomain(
  notification: Notifications.Notification,
): ReceivedPushNotification {
  return {
    data: notification.request.content.data ?? {},
  };
}

export function mapExpoNotificationResponseToDomain(
  response: Notifications.NotificationResponse,
): PushNotificationResponse {
  return {
    identifier: response.notification.request.identifier,
    data: response.notification.request.content.data ?? {},
  };
}
