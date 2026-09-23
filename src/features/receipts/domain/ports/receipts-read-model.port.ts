import type { ReceiptsPageDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";

export interface GetReceiptsParams {
  page?: number;
  pageSize?: number;
}

export interface ReceiptsReadModelPort {
  getReceipts(params?: GetReceiptsParams): Promise<ReceiptsPageDto>;
}
