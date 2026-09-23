import type { ReceiptsCountDto } from "@/src/features/reports/application/dtos/receipts-count.dto";

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

export const mapReceiptsCountApiItemToDto = (
  item: ReceiptsCountApiItem,
): ReceiptsCountDto => ({
  total: item.total,
  billableCount: item.facturables,
  nonBillableCount: item.no_facturables,
  totalSpent: item.total_gastado,
});
