import type { ReceiptDetail } from "@/src/features/receipts/application/dtos/receipt/receipt-detail.dto";
import type { ReceiptDetailReadModelPort } from "@/src/features/receipts/domain/ports/receipt-detail-read-model.port";
import { getReceiptDetailMockItem } from "@/src/features/receipts/infrastructure/mocks/receipt-detail.mock";
import {
  mapReceiptDetailApiItemToDto,
  type ReceiptDetailResponse,
} from "@/src/features/receipts/infrastructure/schemas/receipt-detail.schema";

const MOCK_LATENCY_MS = 300;

export class MockReceiptDetailReadModel implements ReceiptDetailReadModelPort {
  async getReceiptDetail(receiptUuid: string): Promise<ReceiptDetail> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const response: ReceiptDetailResponse = {
      status: 200,
      data: getReceiptDetailMockItem(receiptUuid),
    };

    return mapReceiptDetailApiItemToDto(response.data);
  }
}
