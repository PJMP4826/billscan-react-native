import type { ComplementoDto } from "@/src/features/invoices/application/dtos/invoice/complemento.dto";
import type { ConceptosDto } from "@/src/features/invoices/application/dtos/invoice/conceptos.dto";
import type { EmisorDto } from "@/src/features/invoices/application/dtos/invoice/emisor.dto";
import type { ImpuestosDto } from "@/src/features/invoices/application/dtos/invoice/impuestos.dto";
import type { ReceptorDto } from "@/src/features/invoices/application/dtos/invoice/receptor.dto";

export interface CfdiDto {
  emisor: EmisorDto;
  receptor: ReceptorDto;
  conceptos: ConceptosDto[];
  complemento: ComplementoDto;
  version: string;
  fecha: string;
  forma_pago: string;
  sub_total: number;
  moneda: string;
  total: number;
  tipo_de_comprobante: string;
  exportacion: string;
  metodo_pago: string;
  lugar_expedicion: string;
  impuestos: ImpuestosDto | null;
  serie: string | null;
  folio: string | null;
  condiciones_de_pago: string | null;
  tipo_cambio: number | null;
  descuento: number | null;
}
