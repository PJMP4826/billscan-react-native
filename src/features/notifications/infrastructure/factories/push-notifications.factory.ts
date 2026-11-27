import type { PushNotificationsPort } from "@/src/features/notifications/domain/ports/push-notifications.port";
import { PushNotificationsAdapter } from "@/src/features/notifications/infrastructure/adapters/push-notifications.adapter";

export function createPushNotifications(): PushNotificationsPort {
  return new PushNotificationsAdapter();
}
