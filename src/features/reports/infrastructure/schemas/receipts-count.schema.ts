import type { ReceiptsCount } from "@/src/features/reports/domain/records/receipts-count.record";

export interface ReceiptsCountApiItem {
  total: string;
  facturables: string;
  no_facturables: string;
  total_gastado: string;
}

export interface ReceiptsCountResponse {
  status: number;
  data: ReceiptsCountApiItem;
}

export const mapReceiptsCountApiItemToRecord = (
  item: ReceiptsCountApiItem,
): ReceiptsCount => ({
  total: item.total,
  billableCount: item.facturables,
  nonBillableCount: item.no_facturables,
  totalSpent: item.total_gastado,
});
