import type { RecentActivityDto } from "@/src/features/reports/application/dtos/recent-activity.dto";
import type { RecentActivityReadModelPort } from "@/src/features/reports/domain/ports/recent-activity-read-model.port";
import { recentActivityMockItems } from "@/src/features/reports/infrastructure/mocks/recent-activity.mock";
import {
  mapRecentActivityApiItemToDto,
  type RecentActivityResponse,
} from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";

const MOCK_LATENCY_MS = 300;

export class MockRecentActivityReadModel implements RecentActivityReadModelPort {
  async getRecentActivity(): Promise<RecentActivityDto[]> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const response: RecentActivityResponse = {
      status: 200,
      data: recentActivityMockItems,
    };

    return response.data.map(mapRecentActivityApiItemToDto);
  }
}
