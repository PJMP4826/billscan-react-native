import type { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";

export interface FiscalInfoCsfInput {
  file: CsfFile;
  email: string;
  useCfdiCodeDefault: InvoiceUse;
}

export interface FiscalInfoCsfResult {
  status: number;
  message: string;
}

export interface FiscalInfoCsfPort {
  createFromCsf(input: FiscalInfoCsfInput): Promise<FiscalInfoCsfResult>;
}
