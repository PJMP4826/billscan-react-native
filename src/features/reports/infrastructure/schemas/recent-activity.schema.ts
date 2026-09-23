import type { RecentActivityDto } from "@/src/features/reports/application/dtos/recent-activity.dto";

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

export const mapRecentActivityApiItemToDto = (
  item: RecentActivityApiItem,
): RecentActivityDto => ({
  merchant: item.comercio,
  fileUrl: item.file_url,
  createdAt: item.fecha_alta,
  total: item.total,
});
