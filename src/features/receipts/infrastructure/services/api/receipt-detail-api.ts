import type { ReceiptDetailResponse } from "@/src/features/receipts/infrastructure/schemas/receipt-detail.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const receiptDetailApi = {
  get: (receiptUuid: string) =>
    client.get<ReceiptDetailResponse>(`/receipts/${receiptUuid}`),
};
