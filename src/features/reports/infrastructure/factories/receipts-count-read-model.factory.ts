import type { ReceiptsCountReadModelPort } from "@/src/features/reports/domain/ports/receipts-count-read-model.port";
import { HttpReceiptsCountReadModel } from "@/src/features/reports/infrastructure/adapters/http-receipts-count-read-model";
import { MockReceiptsCountReadModel } from "@/src/features/reports/infrastructure/adapters/mock-receipts-count-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createReceiptsCountReadModel(): ReceiptsCountReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockReceiptsCountReadModel();
  }

  return new HttpReceiptsCountReadModel();
}
