import type { ReceiptsPageDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";
import type { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";

export interface GetReceiptsParams {
  page?: number;
  pageSize?: number;
  status?: ReceiptStatus;
}

export interface ReceiptsReadModelPort {
  getReceipts(params?: GetReceiptsParams): Promise<ReceiptsPageDto>;
}
