import type { ReceiptDetail } from "@/src/features/receipts/application/dtos/receipt/receipt-detail.dto";
import type { ReceiptDetailReadModelPort } from "@/src/features/receipts/domain/ports/receipt-detail-read-model.port";
import { mapReceiptDetailResponseToDto } from "@/src/features/receipts/infrastructure/schemas/receipt-detail.schema";
import { receiptDetailApi } from "@/src/features/receipts/infrastructure/services/api/receipt-detail-api";

export class HttpReceiptDetailReadModel implements ReceiptDetailReadModelPort {
  async getReceiptDetail(receiptUuid: string): Promise<ReceiptDetail> {
    const response = await receiptDetailApi.get(receiptUuid);

    return mapReceiptDetailResponseToDto(response);
  }
}
