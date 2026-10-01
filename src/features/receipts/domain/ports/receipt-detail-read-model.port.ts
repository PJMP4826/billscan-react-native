import type { ReceiptDetail } from "@/src/features/receipts/application/dtos/receipt/receipt-detail.dto";

export interface ReceiptDetailReadModelPort {
  getReceiptDetail(receiptUuid: string): Promise<ReceiptDetail>;
}
