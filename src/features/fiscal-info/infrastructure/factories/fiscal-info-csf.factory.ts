import type { FiscalInfoCsfPort } from "@/src/features/fiscal-info/domain/ports/fiscal-info-csf.port";
import { HttpFiscalInfoCsfAdapter } from "@/src/features/fiscal-info/infrastructure/adapters/http-fiscal-info-csf.adapter";

export function createFiscalInfoCsf(): FiscalInfoCsfPort {
  return new HttpFiscalInfoCsfAdapter();
}
