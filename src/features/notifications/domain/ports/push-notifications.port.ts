import type { PushPermissionStatus } from "@/src/features/notifications/domain/enums/push-permission-status.enum";

export interface ReceivedPushNotification {
  data: Record<string, unknown>;
}

export interface PushNotificationResponse {
  identifier: string;
  data: Record<string, unknown>;
}

export interface PushNotificationListeners {
  onNotificationReceived?: (notification: ReceivedPushNotification) => void;
  onNotificationResponse?: (response: PushNotificationResponse) => void;
}

export interface PushNotificationsPort {
  ensureChannel(): Promise<void>;
  getPermissionStatus(): Promise<PushPermissionStatus>;
  requestPermission(): Promise<PushPermissionStatus>;
  getPushToken(): Promise<string | null>;
  attachListeners(listeners: PushNotificationListeners): () => void;
  getLastResponse(): PushNotificationResponse | null;
  clearLastResponse(): void;
}
