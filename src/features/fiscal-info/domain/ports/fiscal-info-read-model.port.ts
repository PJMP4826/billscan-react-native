import type { FiscalInfoDto } from "@/src/features/fiscal-info/application/dtos/fiscal-info.dto";

export interface FiscalInfoReadModelPort {
  /** Devuelve `null` cuando el usuario aún no ha registrado sus datos fiscales (404). */
  getFiscalInfo(): Promise<FiscalInfoDto | null>;
}
