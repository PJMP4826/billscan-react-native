import type { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { RegimenFiscalDto } from "@/src/features/fiscal-info/application/dtos/regimen-fiscal.dto";

export interface FiscalInfoDto {
  rfc: string;
  razon_social: string;
  email: string;
  cp: string;
  address: string;
  use_cfdi_default: InvoiceUse;
  regimenes: RegimenFiscalDto[];
}
