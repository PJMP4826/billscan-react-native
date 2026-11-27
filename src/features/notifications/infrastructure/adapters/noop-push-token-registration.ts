import type { PushPlatform } from "@/src/features/notifications/domain/enums/push-platform.enum";
import type { PushTokenRegistrationPort } from "@/src/features/notifications/domain/ports/push-token-registration.port";

export class NoopPushTokenRegistration implements PushTokenRegistrationPort {
  async register(token: string, platform: PushPlatform): Promise<void> {
    if (__DEV__) {
      console.log(`[push] Token listo para registrar (${platform}):`, token);
    }
  }

  async unregister(token: string): Promise<void> {
    if (__DEV__) {
      console.log("[push] Token a desregistrar:", token);
    }
  }
}
