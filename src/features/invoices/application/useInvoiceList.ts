import type { InvoiceDto } from "@/src/features/invoices/application/dtos/invoices-list.dto";
import { useInvoicesQuery } from "@/src/features/invoices/infrastructure/repositories/invoices-list.repository";
import { formatCurrency } from "@/src/utils/currency-formatter";

export interface InvoiceListItemViewModel {
  invoiceUuid: string;
  issuerName: string;
  /** Etiqueta "SERIE-FOLIO" lista para UI (p. ej. "FCP-23586096"). */
  cfdiLabel: string;
  totalLabel: string;
  /** Uso del CFDI normalizado a "G03 - Gastos en general". */
  usageLabel: string;
}

/**
 * Normaliza serie y folio en una sola etiqueta "SERIE-FOLIO".
 * Soporta datos incompletos sin imprimir guiones colgantes.
 */
const buildCfdiLabel = (serie: string, folio: string): string => {
  if (serie && folio) {
    return `${serie}-${folio}`;
  }

  return serie || folio || "Sin folio";
};

/**
 * Normaliza la clave de uso de CFDI que entrega la API.
 * La API ya suele mandar "G03 - Gastos en general"; si solo viene la clave,
 * se conserva tal cual para no inventar descripciones.
 */
const normalizeUsage = (usage: string): string => usage.trim();

const mapInvoiceToViewModel = (
  invoice: InvoiceDto,
): InvoiceListItemViewModel => ({
  invoiceUuid: invoice.invoiceUuid,
  issuerName: invoice.issuerName,
  cfdiLabel: buildCfdiLabel(invoice.serie, invoice.folio),
  totalLabel: formatCurrency(invoice.total),
  usageLabel: normalizeUsage(invoice.usage),
});

interface UseInvoiceListOptions {
  page?: number;
  pageSize?: number;
}

export const useInvoiceList = ({
  page = 1,
  pageSize = 20,
}: UseInvoiceListOptions = {}) => {
  const query = useInvoicesQuery(page, pageSize);

  return {
    invoices: query.data ? query.data.invoices.map(mapInvoiceToViewModel) : [],
    total: query.data?.total ?? 0,
    page: query.data?.page ?? page,
    pageSize: query.data?.pageSize ?? pageSize,
    totalPages: query.data?.totalPages ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
