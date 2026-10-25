import type { RecentActivityDto } from "@/src/features/reports/application/dtos/recent-activity.dto";

export interface RecentActivityReadModelPort {
  getRecentActivity(): Promise<RecentActivityDto[]>;
}
