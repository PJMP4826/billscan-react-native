import type { PushPlatform } from "@/src/features/notifications/domain/enums/push-platform.enum";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

interface PushTokenResponse {
  status: number;
  message: string;
}

export const pushTokensApi = {
  register: (token: string, platform: PushPlatform) =>
    client.post<PushTokenResponse>("/push-tokens", { token, platform }),
  unregister: (token: string) =>
    client.delete<PushTokenResponse>(
      `/push-tokens/${encodeURIComponent(token)}`,
    ),
};
