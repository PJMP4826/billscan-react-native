import type { ReceiptsReadModelPort } from "@/src/features/receipts/domain/ports/receipts-read-model.port";
import { HttpReceiptsReadModel } from "@/src/features/receipts/infrastructure/adapters/http-receipts-read-model";
import { MockReceiptsReadModel } from "@/src/features/receipts/infrastructure/adapters/mock-receipts-read-model";
import { ENV } from "@/src/shared/constants/env";

export function createReceiptsReadModel(): ReceiptsReadModelPort {
  if (ENV.USE_MOCKS) {
    return new MockReceiptsReadModel();
  }

  return new HttpReceiptsReadModel();
}
