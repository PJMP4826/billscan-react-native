import type {
  InvoiceDto,
  InvoicesPageDto,
} from "@/src/features/invoices/application/dtos/invoices-list.dto";

/** Item crudo tal como lo entrega `GET /cfdis`. */
export interface InvoiceApiItem {
  receipt_uuid: string;
  emisor_nombre: string;
  total: string;
  serie: string;
  folio: string;
  uso_cfdi: string;
}

export interface InvoicesListData {
  cfdis: InvoiceApiItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface InvoicesListResponse {
  status: number;
  data: InvoicesListData;
}

/**
 * Traduce el objeto de la API (snake_case) al modelo de dominio del feature.
 * Se aplanan los `null`/`undefined` a "" para no romper la UI.
 */
export const mapInvoiceApiItemToDto = (item: InvoiceApiItem): InvoiceDto => ({
  invoiceUuid: item.receipt_uuid,
  issuerName: item.emisor_nombre ?? "",
  total: item.total ?? "",
  serie: item.serie ?? "",
  folio: item.folio ?? "",
  usage: item.uso_cfdi ?? "",
});

export const mapInvoicesListResponseToDto = (
  response: InvoicesListResponse,
): InvoicesPageDto => ({
  invoices: (response.data.cfdis ?? []).map(mapInvoiceApiItemToDto),
  total: response.data.total,
  page: response.data.page,
  pageSize: response.data.page_size,
  totalPages: response.data.total_pages,
});
