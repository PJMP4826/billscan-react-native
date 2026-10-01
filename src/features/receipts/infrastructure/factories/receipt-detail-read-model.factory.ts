import type { ReceiptDetailReadModelPort } from "@/src/features/receipts/domain/ports/receipt-detail-read-model.port";
import { HttpReceiptDetailReadModel } from "@/src/features/receipts/infrastructure/adapters/http-receipt-detail-read-model";
import { MockReceiptDetailReadModel } from "@/src/features/receipts/infrastructure/adapters/mock-receipt-detail-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createReceiptDetailReadModel(): ReceiptDetailReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockReceiptDetailReadModel();
  }

  return new HttpReceiptDetailReadModel();
}
