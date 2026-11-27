import { Platform } from "react-native";

import type { PushTokenRegistrationPort } from "@/src/features/notifications/domain/ports/push-token-registration.port";
import { HttpPushTokenRegistration } from "@/src/features/notifications/infrastructure/adapters/http-push-token-registration";
import { NoopPushTokenRegistration } from "@/src/features/notifications/infrastructure/adapters/noop-push-token-registration";

export function createPushTokenRegistration(): PushTokenRegistrationPort {
  if (Platform.OS === "web") return new NoopPushTokenRegistration();
  return new HttpPushTokenRegistration();
}
