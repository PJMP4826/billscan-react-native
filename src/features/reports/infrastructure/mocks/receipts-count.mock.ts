import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { receiptsListMockItems } from "@/src/features/receipts/infrastructure/mocks/receipts-list.mock";
import type { ReceiptsCountApiItem } from "@/src/features/reports/infrastructure/schemas/receipts-count.schema";

/**
 * Los conteos se derivan del mock de tickets para que el dashboard sea
 * consistente con la pantalla de receipts cuando ENV.USE_MOCKS === "true".
 */
const NON_BILLABLE_STATUSES: string[] = [
  ReceiptStatus.NOT_ELIGIBLE,
  ReceiptStatus.FAILED,
];

const sumTotals = (values: string[]): number =>
  values.reduce((accumulator, value) => {
    const numericValue = Number.parseFloat(value);

    return accumulator + (Number.isNaN(numericValue) ? 0 : numericValue);
  }, 0);

const totalReceipts = 57;
const billableReceipts = receiptsListMockItems.filter(
  (item) => !NON_BILLABLE_STATUSES.includes(item.estado),
).length;
const nonBillableReceipts = totalReceipts - billableReceipts;
const totalSpent = sumTotals(receiptsListMockItems.map((item) => item.total));

export const receiptsCountMockItem: ReceiptsCountApiItem = {
  total: String(totalReceipts),
  facturables: String(billableReceipts),
  no_facturables: String(nonBillableReceipts),
  total_gastado: totalSpent.toFixed(2),
};
