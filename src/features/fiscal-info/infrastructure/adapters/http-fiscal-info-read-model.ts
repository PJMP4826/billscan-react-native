import type { FiscalInfoDto } from "@/src/features/fiscal-info/application/dtos/fiscal-info.dto";
import type { FiscalInfoReadModelPort } from "@/src/features/fiscal-info/domain/ports/fiscal-info-read-model.port";
import {
  mapFiscalInfoResponseToDto,
  type FiscalInfoResponse,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { fiscalInfoApi } from "@/src/features/fiscal-info/infrastructure/services/api/fiscal-info-api";

export class HttpFiscalInfoReadModel implements FiscalInfoReadModelPort {
  async getFiscalInfo(): Promise<FiscalInfoDto | null> {
    try {
      const response: FiscalInfoResponse = await fiscalInfoApi.get();
      return mapFiscalInfoResponseToDto(response);
    } catch (error: any) {
      if (error?.status === 404) {
        return null;
      }
      throw error;
    }
  }
}
