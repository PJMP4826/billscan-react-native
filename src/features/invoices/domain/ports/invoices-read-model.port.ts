import type { InvoicesPageDto } from "@/src/features/invoices/application/dtos/invoices-list.dto";

export interface GetInvoicesParams {
  page?: number;
  pageSize?: number;
  /** Búsqueda libre por emisor, folio o serie (aplicada del lado del cliente). */
  search?: string;
}

export interface InvoicesReadModelPort {
  getInvoices(params?: GetInvoicesParams): Promise<InvoicesPageDto>;
}
