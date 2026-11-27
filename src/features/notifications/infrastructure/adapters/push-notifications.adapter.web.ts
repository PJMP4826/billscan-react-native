import { PushPermissionStatus } from "@/src/features/notifications/domain/enums/push-permission-status.enum";
import type {
  PushNotificationListeners,
  PushNotificationResponse,
  PushNotificationsPort,
} from "@/src/features/notifications/domain/ports/push-notifications.port";

export class PushNotificationsAdapter implements PushNotificationsPort {
  async ensureChannel(): Promise<void> {}

  async getPermissionStatus(): Promise<PushPermissionStatus> {
    return PushPermissionStatus.UNDETERMINED;
  }

  async requestPermission(): Promise<PushPermissionStatus> {
    return PushPermissionStatus.DENIED;
  }

  async getPushToken(): Promise<string | null> {
    return null;
  }

  attachListeners(_listeners: PushNotificationListeners): () => void {
    return () => {};
  }

  getLastResponse(): PushNotificationResponse | null {
    return null;
  }

  clearLastResponse(): void {}
}
