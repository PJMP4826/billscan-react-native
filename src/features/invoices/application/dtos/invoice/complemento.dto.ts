import type { CfdiRegistroFiscalDto } from "@/src/features/invoices/application/dtos/invoice/cfdi-registro-fiscal.dto";
import type { TimbreFiscalDigitalDto } from "@/src/features/invoices/application/dtos/invoice/timbre-fiscal-digital.dto";

export interface ComplementoDto {
  timbre_fiscal_digital: TimbreFiscalDigitalDto;
  cfdi_registro_fiscal: CfdiRegistroFiscalDto | null;
}
