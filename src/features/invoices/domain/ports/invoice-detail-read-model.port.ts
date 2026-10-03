import type { InvoiceDetailDto } from "@/src/features/invoices/application/dtos/invoice/invoice-detail.dto";

export interface InvoiceDetailReadModelPort {
  getInvoiceDetail(receiptUuid: string): Promise<InvoiceDetailDto>;
}
