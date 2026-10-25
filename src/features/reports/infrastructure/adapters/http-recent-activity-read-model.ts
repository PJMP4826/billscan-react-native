import type { RecentActivityDto } from "@/src/features/reports/application/dtos/recent-activity.dto";
import type { RecentActivityReadModelPort } from "@/src/features/reports/domain/ports/recent-activity-read-model.port";
import { mapRecentActivityApiItemToDto } from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";
import { recentActivity } from "@/src/features/reports/infrastructure/services/api/reports-api";

export class HttpRecentActivityReadModel implements RecentActivityReadModelPort {
  async getRecentActivity(): Promise<RecentActivityDto[]> {
    const response = await recentActivity.get();

    return response.data.map(mapRecentActivityApiItemToDto);
  }
}
