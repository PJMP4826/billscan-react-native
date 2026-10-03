import type { InvoiceDetailDto } from "@/src/features/invoices/application/dtos/invoice/invoice-detail.dto";
import type { InvoiceDetailReadModelPort } from "@/src/features/invoices/domain/ports/invoice-detail-read-model.port";
import { mapInvoiceDetailResponseToDto } from "@/src/features/invoices/infrastructure/schemas/invoice-detail.schema";
import { invoiceDetailApi } from "@/src/features/invoices/infrastructure/services/api/invoice-detail-api";

export class HttpInvoiceDetailReadModel implements InvoiceDetailReadModelPort {
  async getInvoiceDetail(receiptUuid: string): Promise<InvoiceDetailDto> {
    const response = await invoiceDetailApi.get(receiptUuid);

    return mapInvoiceDetailResponseToDto(response);
  }
}
