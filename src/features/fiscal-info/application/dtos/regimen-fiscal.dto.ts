import type { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";

export interface RegimenFiscalDto {
  code: TaxRegime;
  description: string;
  fecha_alta: string;
}
