import type { RecentActivityReadModelPort } from "@/src/features/reports/domain/ports/recent-activity-read-model.port";
import { HttpRecentActivityReadModel } from "@/src/features/reports/infrastructure/adapters/http-recent-activity-read-model";
import { MockRecentActivityReadModel } from "@/src/features/reports/infrastructure/adapters/mock-recent-activity-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createRecentActivityReadModel(): RecentActivityReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockRecentActivityReadModel();
  }

  return new HttpRecentActivityReadModel();
}
