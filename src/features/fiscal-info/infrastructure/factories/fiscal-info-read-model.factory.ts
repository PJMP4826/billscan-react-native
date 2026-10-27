import type { FiscalInfoReadModelPort } from "@/src/features/fiscal-info/domain/ports/fiscal-info-read-model.port";
import { HttpFiscalInfoReadModel } from "@/src/features/fiscal-info/infrastructure/adapters/http-fiscal-info-read-model";
import { MockFiscalInfoReadModel } from "@/src/features/fiscal-info/infrastructure/adapters/mock-fiscal-info-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createFiscalInfoReadModel(): FiscalInfoReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockFiscalInfoReadModel();
  }

  return new HttpFiscalInfoReadModel();
}
