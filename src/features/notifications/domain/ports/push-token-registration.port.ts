import type { PushPlatform } from "@/src/features/notifications/domain/enums/push-platform.enum";

export interface PushTokenRegistrationPort {
  register(token: string, platform: PushPlatform): Promise<void>;
  unregister(token: string): Promise<void>;
}
