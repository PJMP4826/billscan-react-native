import type { InvoicesReadModelPort } from "@/src/features/invoices/domain/ports/invoices-read-model.port";
import { HttpInvoicesReadModel } from "@/src/features/invoices/infrastructure/adapters/http-invoices-read-model";
import { MockInvoicesReadModel } from "@/src/features/invoices/infrastructure/adapters/mock-invoices-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createInvoicesReadModel(): InvoicesReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockInvoicesReadModel();
  }

  return new HttpInvoicesReadModel();
}
