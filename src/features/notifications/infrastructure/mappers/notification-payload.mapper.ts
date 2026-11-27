import type { Href } from "expo-router";

import type { PushNotificationPayload } from "@/src/features/notifications/infrastructure/schemas/push-notification-payload.schema";

export function mapNotificationPayloadToHref(
  payload: PushNotificationPayload,
): Href | null {
  switch (payload.type) {
    case "invoice":
      return {
        pathname: "/(tabs)/invoices/[id]",
        params: { id: payload.receipt_uuid },
      };
    case "receipt":
      return {
        pathname: "/(tabs)/receipts/[id]",
        params: { id: payload.receipt_uuid },
      };
    case "home":
      return "/(tabs)";
    default:
      return null;
  }
}
