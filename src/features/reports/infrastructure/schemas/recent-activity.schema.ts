import type { RecentActivity } from "@/src/features/reports/domain/records/recent-activity.record";

export interface RecentActivityApiItem {
  comercio: string;
  file_url: string;
  fecha_alta: string;
  total: string;
}

export interface RecentActivityResponse {
  status: number;
  data: RecentActivityApiItem[];
}

export const mapRecentActivityApiItemToRecord = (
  item: RecentActivityApiItem,
): RecentActivity => ({
  merchant: item.comercio,
  fileUrl: item.file_url,
  createdAt: item.fecha_alta,
  total: item.total,
});
