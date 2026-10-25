import type { MonthlyInvoicingReadModelPort } from "@/src/features/reports/domain/ports/monthly-invoicing-read-model.port";
import { HttpMonthlyInvoicingReadModel } from "@/src/features/reports/infrastructure/adapters/http-monthly-invoicing-read-model";
import { MockMonthlyInvoicingReadModel } from "@/src/features/reports/infrastructure/adapters/mock-monthly-invoicing-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createMonthlyInvoicingReadModel(): MonthlyInvoicingReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockMonthlyInvoicingReadModel();
  }

  return new HttpMonthlyInvoicingReadModel();
}
