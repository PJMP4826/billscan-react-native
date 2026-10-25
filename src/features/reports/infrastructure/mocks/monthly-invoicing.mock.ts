import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { receiptsListMockItems } from "@/src/features/receipts/infrastructure/mocks/receipts-list.mock";
import type { MonthlyInvoicingApiItem } from "@/src/features/reports/infrastructure/schemas/monthly-invoicing.schema";

/**
 * La facturación del periodo se deriva de los tickets COMPLETED del mock,
 * así el dashboard queda consistente con la pantalla de receipts.
 */
const completedReceipts = receiptsListMockItems.filter(
  (item) => item.estado === ReceiptStatus.COMPLETED,
);

const totalInvoiced = completedReceipts.reduce((accumulator, item) => {
  const numericValue = Number.parseFloat(item.total);

  return accumulator + (Number.isNaN(numericValue) ? 0 : numericValue);
}, 0);

export const monthlyInvoicingMockItem: MonthlyInvoicingApiItem = {
  total_facturado: totalInvoiced.toFixed(2),
  facturas_generadas: String(completedReceipts.length),
  periodo: "month",
};
