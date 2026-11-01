import type {
  FiscalInfoCsfInput,
  FiscalInfoCsfPort,
  FiscalInfoCsfResult,
} from "@/src/features/fiscal-info/domain/ports/fiscal-info-csf.port";
import { fiscalInfoApi } from "@/src/features/fiscal-info/infrastructure/services/api/fiscal-info-api";

export class HttpFiscalInfoCsfAdapter implements FiscalInfoCsfPort {
  async createFromCsf(
    input: FiscalInfoCsfInput,
  ): Promise<FiscalInfoCsfResult> {
    return fiscalInfoApi.createFromCsf(input);
  }
}
