import type { MonthlyInvoicingDto } from "@/src/features/reports/application/dtos/monthly-invoicing.dto";

export interface GetMonthlyInvoicingParams {
  period?: string;
}

export interface MonthlyInvoicingReadModelPort {
  getMonthlyInvoicing(
    params?: GetMonthlyInvoicingParams,
  ): Promise<MonthlyInvoicingDto>;
}
