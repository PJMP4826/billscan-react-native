import type { PushPlatform } from "@/src/features/notifications/domain/enums/push-platform.enum";
import type { PushTokenRegistrationPort } from "@/src/features/notifications/domain/ports/push-token-registration.port";
import { pushTokensApi } from "@/src/features/notifications/infrastructure/services/api/push-tokens-api";

export class HttpPushTokenRegistration implements PushTokenRegistrationPort {
  async register(token: string, platform: PushPlatform): Promise<void> {
    await pushTokensApi.register(token, platform);
  }

  async unregister(token: string): Promise<void> {
    await pushTokensApi.unregister(token);
  }
}
