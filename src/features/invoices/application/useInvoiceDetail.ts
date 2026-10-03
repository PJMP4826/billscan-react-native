import type { ConceptosDto } from "@/src/features/invoices/application/dtos/invoice/conceptos.dto";
import type { ImpuestosDto } from "@/src/features/invoices/application/dtos/invoice/impuestos.dto";
import type { InvoiceDetailDto } from "@/src/features/invoices/application/dtos/invoice/invoice-detail.dto";
import type { TrasladoDto } from "@/src/features/invoices/application/dtos/invoice/traslado.dto";
import { useInvoiceDetailQuery } from "@/src/features/invoices/infrastructure/repositories/invoice-detail.repository";
import { formatCfdiDateLabel } from "@/src/utils/cfdi-date-formatter";
import {
  DEFAULT_CURRENCY_CODE,
  formatCurrency,
} from "@/src/utils/currency-formatter";

const DASH = "—";

/* ══════════════════════════════════════════════════════════════════════════
 * View models ya formateados que consumen los componentes de presentación.
 * ══════════════════════════════════════════════════════════════════════════ */

export interface InvoiceHeroViewModel {
  issuerName: string;
  totalLabel: string;
  currencyCode: string;
  dateLabel: string | null;
  /** "Serie MOCK • Folio 00000123" o "Sin folio". */
  serieFolioLabel: string;
  tipoComprobanteLabel: string | null;
}

export interface InvoiceFiscalPartyViewModel {
  name: string;
  rfcLabel: string;
}

export interface InvoiceFiscalDataViewModel {
  emisor: InvoiceFiscalPartyViewModel;
  receptor: InvoiceFiscalPartyViewModel;
  regimenFiscalEmisor: string | null;
  regimenFiscalReceptor: string | null;
  lugarExpedicionLabel: string | null;
  usoCfdi: string | null;
}

export interface InvoiceImpuestoViewModel {
  /** Llave opaca del contrato, usada solo como `key`. */
  id: string;
  /** "IVA (002)". */
  impuestoLabel: string;
  baseLabel: string;
  /** "Tasa 16% (0.160000)" o "Exento". */
  tasaLabel: string;
  importeLabel: string;
}

export interface InvoiceConceptoViewModel {
  id: string;
  /** Cantidad en formato "1x" para el listado. */
  cantidadBadgeLabel: string;
  /** Cantidad en formato "1.00" para el detalle. */
  cantidadLabel: string;
  descripcion: string;
  /** "SAT: 81112006". */
  claveProdServLabel: string;
  /** "81112006". */
  claveProdServCode: string;
  /** "servicios de almacenamiento de datos". */
  claveProdServDescription: string;
  importeLabel: string;
  valorUnitarioLabel: string;
  descuentoLabel: string;
  /** "ACT". */
  unidadCode: string;
  /** "Actividad". */
  unidadDescription: string;
  noIdentificacion: string | null;
  objetoImpuestoLabel: string | null;
  impuestos: InvoiceImpuestoViewModel[];
  tieneImpuestos: boolean;
}

export interface InvoiceTotalsViewModel {
  subtotalLabel: string;
  /** `null` cuando el CFDI no reporta `total_impuestos_trasladados`. */
  impuestosTrasladadosLabel: string | null;
  totalLabel: string;
  impuestos: InvoiceImpuestoViewModel[];
  tieneImpuestos: boolean;
}

export interface InvoiceCertificacionViewModel {
  version: string;
  formaPago: string;
  metodoPago: string;
  uuid: string;
  fechaTimbradoLabel: string | null;
  rfcProvCertif: string;
}

export interface InvoiceDetailViewModel {
  hero: InvoiceHeroViewModel;
  fiscal: InvoiceFiscalDataViewModel;
  conceptos: InvoiceConceptoViewModel[];
  totals: InvoiceTotalsViewModel;
  certificacion: InvoiceCertificacionViewModel;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Helpers de formateo (evitan imprimir null/NaN en la UI).
 * ══════════════════════════════════════════════════════════════════════════ */

/** Igual que `formatCurrency`, pero `null`/`""` se muestran como "—". */
const formatCurrencyOrDash = (value: number | null | undefined): string => {
  if (value === null || value === undefined) {
    return DASH;
  }

  return formatCurrency(value);
};

/** Extrae el código ISO de una cadena tipo "MXN - Peso Mexicano". */
const extractCurrencyCode = (moneda: string): string => {
  const [code] = moneda.split(" - ");
  const trimmed = code?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : DEFAULT_CURRENCY_CODE;
};

/** Separa "81112006 - servicios de almacenamiento" en [código, descripción]. */
const splitCodeAndDescription = (
  value: string,
): { code: string; description: string } => {
  const separatorIndex = value.indexOf(" - ");

  if (separatorIndex === -1) {
    return { code: value.trim(), description: "" };
  }

  return {
    code: value.slice(0, separatorIndex).trim(),
    description: value.slice(separatorIndex + 3).trim(),
  };
};

/** Convierte "002 - IVA" en "IVA (002)". */
const buildImpuestoLabel = (impuesto: string): string => {
  const { code, description } = splitCodeAndDescription(impuesto);

  if (code && description) {
    return `${description} (${code})`;
  }

  return impuesto;
};

/** "Tasa 16% (0.160000)" o el `tipo_factor` cuando no hay tasa (Exento). */
const buildTasaLabel = (traslado: TrasladoDto): string => {
  if (traslado.tasa_o_cuota === null) {
    return traslado.tipo_factor || DASH;
  }

  const percent = Number.parseFloat(
    (traslado.tasa_o_cuota * 100).toFixed(4),
  ).toString();

  return [
    traslado.tipo_factor,
    `${percent}%`,
    `(${traslado.tasa_o_cuota.toFixed(6)})`,
  ]
    .filter(Boolean)
    .join(" ");
};

const mapTraslados = (
  impuestos: ImpuestosDto | null,
): InvoiceImpuestoViewModel[] => {
  if (!impuestos) {
    return [];
  }

  return Object.entries(impuestos.traslados).map(([key, traslado]) => ({
    id: key,
    impuestoLabel: buildImpuestoLabel(traslado.impuesto),
    baseLabel: formatCurrency(traslado.base),
    tasaLabel: buildTasaLabel(traslado),
    importeLabel: formatCurrencyOrDash(traslado.importe),
  }));
};

const buildSerieFolioLabel = (
  serie: string | null,
  folio: string | null,
): string => {
  const parts: string[] = [];

  if (serie) {
    parts.push(`Serie ${serie}`);
  }

  if (folio) {
    parts.push(`Folio ${folio}`);
  }

  return parts.length > 0 ? parts.join(" • ") : "Sin folio";
};

const mapConcepto = (
  concepto: ConceptosDto,
  index: number,
): InvoiceConceptoViewModel => {
  const claveProdServ = splitCodeAndDescription(concepto.clave_prod_serv);
  const claveUnidad = splitCodeAndDescription(concepto.clave_unidad);
  const impuestos = mapTraslados(concepto.impuestos);

  return {
    id: `${concepto.clave_prod_serv}-${index}`,
    cantidadBadgeLabel: `${concepto.cantidad}x`,
    cantidadLabel: concepto.cantidad.toFixed(2),
    descripcion: concepto.descripcion,
    claveProdServLabel: claveProdServ.code
      ? `SAT: ${claveProdServ.code}`
      : concepto.clave_prod_serv || DASH,
    claveProdServCode: claveProdServ.code,
    claveProdServDescription: claveProdServ.description,
    importeLabel: formatCurrency(concepto.importe),
    valorUnitarioLabel: formatCurrency(concepto.valor_unitario),
    descuentoLabel: formatCurrencyOrDash(concepto.descuento),
    unidadCode: claveUnidad.code,
    unidadDescription: claveUnidad.description,
    noIdentificacion: concepto.no_identificacion,
    objetoImpuestoLabel: concepto.objeto_imp ? concepto.objeto_imp : null,
    impuestos,
    tieneImpuestos: impuestos.length > 0,
  };
};

const buildViewModel = (detail: InvoiceDetailDto): InvoiceDetailViewModel => {
  const { cfdi } = detail;
  const impuestos = mapTraslados(cfdi.impuestos);

  return {
    hero: {
      issuerName: cfdi.emisor.nombre || "Emisor no identificado",
      totalLabel: formatCurrency(cfdi.total),
      currencyCode: extractCurrencyCode(cfdi.moneda),
      dateLabel: formatCfdiDateLabel(cfdi.fecha),
      serieFolioLabel: buildSerieFolioLabel(cfdi.serie, cfdi.folio),
      tipoComprobanteLabel: cfdi.tipo_de_comprobante || null,
    },
    fiscal: {
      emisor: {
        name: cfdi.emisor.nombre,
        rfcLabel: cfdi.emisor.rfc,
      },
      receptor: {
        name: cfdi.receptor.nombre,
        rfcLabel: cfdi.receptor.rfc,
      },
      regimenFiscalEmisor: cfdi.emisor.regimen_fiscal || null,
      regimenFiscalReceptor: cfdi.receptor.regimen_fiscal_receptor || null,
      lugarExpedicionLabel: cfdi.lugar_expedicion
        ? `C.P. ${cfdi.lugar_expedicion}`
        : null,
      usoCfdi: cfdi.receptor.uso_cfdi || null,
    },
    conceptos: cfdi.conceptos.map(mapConcepto),
    totals: {
      subtotalLabel: formatCurrency(cfdi.sub_total),
      impuestosTrasladadosLabel:
        cfdi.impuestos?.total_impuestos_trasladados === null ||
        cfdi.impuestos?.total_impuestos_trasladados === undefined
          ? null
          : formatCurrency(cfdi.impuestos.total_impuestos_trasladados),
      totalLabel: formatCurrency(cfdi.total),
      impuestos,
      tieneImpuestos: impuestos.length > 0,
    },
    certificacion: {
      version: cfdi.version,
      formaPago: cfdi.forma_pago,
      metodoPago: cfdi.metodo_pago,
      uuid: cfdi.complemento.timbre_fiscal_digital.uuid,
      fechaTimbradoLabel: formatCfdiDateLabel(
        cfdi.complemento.timbre_fiscal_digital.fecha_timbrado,
      ),
      rfcProvCertif: cfdi.complemento.timbre_fiscal_digital.rfc_prov_certif,
    },
  };
};

/**
 * Carga el detalle de un CFDI y expone estados (`loading`/`error`/`success`)
 * más los view models ya formateados que consumen los componentes atómicos.
 */
export const useInvoiceDetail = (receiptUuid: string) => {
  const query = useInvoiceDetailQuery(receiptUuid);
  const detail = query.data ?? null;

  return {
    detail,
    viewModel: detail ? buildViewModel(detail) : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
