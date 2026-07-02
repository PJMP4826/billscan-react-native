import type { DeductibleExpensesResponse } from "@/src/features/reports/infrastructure/schemas/deductible-expenses.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const deductibleExpenses = {
  get: () =>
    client.get<DeductibleExpensesResponse>("/reporting/deductible-expenses"),
};
