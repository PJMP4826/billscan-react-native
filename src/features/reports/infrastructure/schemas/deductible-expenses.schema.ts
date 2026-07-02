import type { DeductibleExpenses } from "@/src/features/reports/domain/records/deductible-expenses.record";

export interface DeductibleExpensesResponse {
  status: number;
  data: DeductibleExpenses;
}
