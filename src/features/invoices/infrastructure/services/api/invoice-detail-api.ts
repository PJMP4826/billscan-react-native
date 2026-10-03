import type { InvoiceDetailResponse } from "@/src/features/invoices/infrastructure/schemas/invoice-detail.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const invoiceDetailApi = {
  get: (receiptUuid: string) =>
    client.get<InvoiceDetailResponse>(`/cfdis/${receiptUuid}`),
};
