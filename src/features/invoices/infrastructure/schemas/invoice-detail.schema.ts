import type { CfdiRegistroFiscalDto } from "@/src/features/invoices/application/dtos/invoice/cfdi-registro-fiscal.dto";
import type { CfdiDto } from "@/src/features/invoices/application/dtos/invoice/cfdi.dto";
import type { ComplementoDto } from "@/src/features/invoices/application/dtos/invoice/complemento.dto";
import type { ConceptosDto } from "@/src/features/invoices/application/dtos/invoice/conceptos.dto";
import type { EmisorDto } from "@/src/features/invoices/application/dtos/invoice/emisor.dto";
import type { ImpuestosDto } from "@/src/features/invoices/application/dtos/invoice/impuestos.dto";
import type { InvoiceDetailDto } from "@/src/features/invoices/application/dtos/invoice/invoice-detail.dto";
import type { ReceptorDto } from "@/src/features/invoices/application/dtos/invoice/receptor.dto";
import type { TimbreFiscalDigitalDto } from "@/src/features/invoices/application/dtos/invoice/timbre-fiscal-digital.dto";
import type { TrasladoDto } from "@/src/features/invoices/application/dtos/invoice/traslado.dto";

/* ══════════════════════════════════════════════════════════════════════════
 * Contrato crudo de la API (snake_case) para GET /cfdis/{receipt_uuid}.
 * Los tipos reflejan EXACTAMENTE lo que el backend retorna en el JSON: los
 * campos que siempre vienen van sin `?`, y sólo se marca `| null` lo que el
 * contrato declara explícitamente como nullable (mismos campos que el DTO).
 * ══════════════════════════════════════════════════════════════════════════ */

export interface CfdiTrasladoApi {
  base: number;
  impuesto: string;
  tipo_factor: string;
  tasa_o_cuota: number | null;
  importe: number | null;
}

export interface CfdiImpuestosApi {
  traslados: Record<string, CfdiTrasladoApi>;
  total_impuestos_trasladados: number | null;
}

export interface CfdiConceptoApi {
  clave_prod_serv: string;
  cantidad: number;
  clave_unidad: string;
  descripcion: string;
  valor_unitario: number;
  importe: number;
  objeto_imp: string;
  impuestos: CfdiImpuestosApi | null;
  no_identificacion: string | null;
  unidad: string | null;
  descuento: number | null;
}

export interface CfdiEmisorApi {
  rfc: string;
  nombre: string;
  regimen_fiscal: string;
}

export interface CfdiReceptorApi {
  rfc: string;
  nombre: string;
  domicilio_fiscal_receptor: string;
  regimen_fiscal_receptor: string;
  uso_cfdi: string;
}

export interface CfdiTimbreFiscalDigitalApi {
  version: string;
  uuid: string;
  fecha_timbrado: string;
  rfc_prov_certif: string;
}

export interface CfdiRegistroFiscalApi {
  version: string;
  folio: string;
}

export interface CfdiComplementoApi {
  timbre_fiscal_digital: CfdiTimbreFiscalDigitalApi;
  cfdi_registro_fiscal: CfdiRegistroFiscalApi | null;
}

export interface CfdiApi {
  emisor: CfdiEmisorApi;
  receptor: CfdiReceptorApi;
  conceptos: CfdiConceptoApi[];
  complemento: CfdiComplementoApi;
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
  impuestos: CfdiImpuestosApi | null;
  serie: string | null;
  folio: string | null;
  condiciones_de_pago: string | null;
  tipo_cambio: number | null;
  descuento: number | null;
}

export interface InvoiceDetailData {
  receipt_uuid: string;
  cfdi: CfdiApi;
  xml_url: string;
  pdf_url: string;
}

export interface InvoiceDetailResponse {
  status: number;
  data: InvoiceDetailData;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Mapeo API (snake_case) → DTO (snake_case, tipos estrictos)
 * ══════════════════════════════════════════════════════════════════════════ */

const mapEmisor = (emisor: CfdiEmisorApi): EmisorDto => ({
  rfc: emisor.rfc,
  nombre: emisor.nombre,
  regimen_fiscal: emisor.regimen_fiscal,
});

const mapReceptor = (receptor: CfdiReceptorApi): ReceptorDto => ({
  rfc: receptor.rfc,
  nombre: receptor.nombre,
  domicilio_fiscal_receptor: receptor.domicilio_fiscal_receptor,
  regimen_fiscal_receptor: receptor.regimen_fiscal_receptor,
  uso_cfdi: receptor.uso_cfdi,
});

const mapTraslado = (traslado: CfdiTrasladoApi): TrasladoDto => ({
  base: traslado.base,
  impuesto: traslado.impuesto,
  tipo_factor: traslado.tipo_factor,
  tasa_o_cuota: traslado.tasa_o_cuota,
  importe: traslado.importe,
});

/** Preserva la llave opaca (`"002|Tasa|0.160000"`) sin parsearla. */
const mapImpuestos = (
  impuestos: CfdiImpuestosApi | null,
): ImpuestosDto | null => {
  if (!impuestos) {
    return null;
  }

  const traslados: Record<string, TrasladoDto> = {};

  for (const [key, value] of Object.entries(impuestos.traslados)) {
    traslados[key] = mapTraslado(value);
  }

  return {
    traslados,
    total_impuestos_trasladados: impuestos.total_impuestos_trasladados,
  };
};

const mapConcepto = (concepto: CfdiConceptoApi): ConceptosDto => ({
  clave_prod_serv: concepto.clave_prod_serv,
  cantidad: concepto.cantidad,
  clave_unidad: concepto.clave_unidad,
  descripcion: concepto.descripcion,
  valor_unitario: concepto.valor_unitario,
  importe: concepto.importe,
  objeto_imp: concepto.objeto_imp,
  impuestos: mapImpuestos(concepto.impuestos),
  no_identificacion: concepto.no_identificacion,
  unidad: concepto.unidad,
  descuento: concepto.descuento,
});

const mapTimbreFiscalDigital = (
  timbre: CfdiTimbreFiscalDigitalApi,
): TimbreFiscalDigitalDto => ({
  version: timbre.version,
  uuid: timbre.uuid,
  fecha_timbrado: timbre.fecha_timbrado,
  rfc_prov_certif: timbre.rfc_prov_certif,
});

const mapRegistroFiscal = (
  registro: CfdiRegistroFiscalApi | null,
): CfdiRegistroFiscalDto | null => {
  if (!registro) {
    return null;
  }

  return {
    version: registro.version,
    folio: registro.folio,
  };
};

const mapComplemento = (complemento: CfdiComplementoApi): ComplementoDto => ({
  timbre_fiscal_digital: mapTimbreFiscalDigital(
    complemento.timbre_fiscal_digital,
  ),
  cfdi_registro_fiscal: mapRegistroFiscal(complemento.cfdi_registro_fiscal),
});

const mapCfdi = (cfdi: CfdiApi): CfdiDto => ({
  emisor: mapEmisor(cfdi.emisor),
  receptor: mapReceptor(cfdi.receptor),
  conceptos: cfdi.conceptos.map(mapConcepto),
  complemento: mapComplemento(cfdi.complemento),
  version: cfdi.version,
  fecha: cfdi.fecha,
  forma_pago: cfdi.forma_pago,
  sub_total: cfdi.sub_total,
  moneda: cfdi.moneda,
  total: cfdi.total,
  tipo_de_comprobante: cfdi.tipo_de_comprobante,
  exportacion: cfdi.exportacion,
  metodo_pago: cfdi.metodo_pago,
  lugar_expedicion: cfdi.lugar_expedicion,
  impuestos: mapImpuestos(cfdi.impuestos),
  serie: cfdi.serie,
  folio: cfdi.folio,
  condiciones_de_pago: cfdi.condiciones_de_pago,
  tipo_cambio: cfdi.tipo_cambio,
  descuento: cfdi.descuento,
});

export const mapInvoiceDetailDataToDto = (
  data: InvoiceDetailData,
): InvoiceDetailDto => ({
  receiptUuid: data.receipt_uuid,
  cfdi: mapCfdi(data.cfdi),
  xmlUrl: data.xml_url,
  pdfUrl: data.pdf_url,
});

export const mapInvoiceDetailResponseToDto = (
  response: InvoiceDetailResponse,
): InvoiceDetailDto => mapInvoiceDetailDataToDto(response.data);
