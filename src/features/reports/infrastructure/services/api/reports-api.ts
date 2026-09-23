import type { MonthlyInvoicingResponse } from "@/src/features/reports/infrastructure/schemas/monthly-invoicing.schema";
import type { RecentActivityResponse } from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";
import type { ReceiptsCountResponse } from "@/src/features/reports/infrastructure/schemas/receipts-count.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const receiptsCount = {
  get: () => client.get<ReceiptsCountResponse>("/reporting/receipts/count"),
};

export const monthlyInvoicing = {
  get: (period: string = "month") =>
    client.get<MonthlyInvoicingResponse>(
      `/reporting/completed-billing?period=${period}`,
    ),
};

export const recentActivity = {
  get: () => client.get<RecentActivityResponse>("/reporting/recent-activity"),
};
