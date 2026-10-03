import type { InvoiceDetailReadModelPort } from "@/src/features/invoices/domain/ports/invoice-detail-read-model.port";
import { HttpInvoiceDetailReadModel } from "@/src/features/invoices/infrastructure/adapters/http-invoice-detail-read-model";
import { MockInvoiceDetailReadModel } from "@/src/features/invoices/infrastructure/adapters/mock-invoice-detail-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createInvoiceDetailReadModel(): InvoiceDetailReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockInvoiceDetailReadModel();
  }

  return new HttpInvoiceDetailReadModel();
}
