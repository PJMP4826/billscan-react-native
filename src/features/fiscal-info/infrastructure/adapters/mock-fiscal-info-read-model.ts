import type { FiscalInfoDto } from "@/src/features/fiscal-info/application/dtos/fiscal-info.dto";
import type { FiscalInfoReadModelPort } from "@/src/features/fiscal-info/domain/ports/fiscal-info-read-model.port";
import { getFiscalInfoMockItem } from "@/src/features/fiscal-info/infrastructure/mocks/fiscal-info.mock";
import {
  mapFiscalInfoApiItemToDto,
  type FiscalInfoResponse,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";

const MOCK_LATENCY_MS = 300;

export class MockFiscalInfoReadModel implements FiscalInfoReadModelPort {
  async getFiscalInfo(): Promise<FiscalInfoDto | null> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const response: FiscalInfoResponse = {
      status: 200,
      data: getFiscalInfoMockItem(),
    };

    return mapFiscalInfoApiItemToDto(response.data);
  }
}
