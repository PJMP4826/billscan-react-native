import type { DeductibleExpensesResponse } from "@/src/features/reports/infrastructure/schemas/deductible-expenses.schema";
import type { RecentActivityResponse } from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const deductibleExpenses = {
  get: () =>
    client.get<DeductibleExpensesResponse>("/reporting/deductible-expenses"),
};

export const recentActivity = {
  get: () => client.get<RecentActivityResponse>("/reporting/recent-activity"),
};
