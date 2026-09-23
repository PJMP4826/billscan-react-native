import type { MonthlyInvoicingDto } from "@/src/features/reports/application/dtos/monthly-invoicing.dto";

export interface MonthlyInvoicingApiItem {
  total_facturado: string;
  facturas_generadas: string;
  periodo: string;
}

export interface MonthlyInvoicingResponse {
  status: number;
  data: MonthlyInvoicingApiItem;
}

export const mapMonthlyInvoicingApiItemToDto = (
  item: MonthlyInvoicingApiItem,
): MonthlyInvoicingDto => ({
  totalAmount: item.total_facturado,
  generatedCount: item.facturas_generadas,
  period: item.periodo,
});
