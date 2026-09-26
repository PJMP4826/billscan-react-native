import type { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";

export interface ReceiptDto {
  receiptUuid: string;
  merchantName: string;
  registeredAt: string;
  total: string;
  status: ReceiptStatus;
  fileUrl: string;
}

export interface ReceiptsPageDto {
  receipts: ReceiptDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
