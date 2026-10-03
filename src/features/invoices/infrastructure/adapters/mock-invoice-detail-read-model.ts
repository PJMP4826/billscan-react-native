import type { InvoiceDetailDto } from "@/src/features/invoices/application/dtos/invoice/invoice-detail.dto";
import type { InvoiceDetailReadModelPort } from "@/src/features/invoices/domain/ports/invoice-detail-read-model.port";
import {
  mapInvoiceDetailDataToDto,
  type InvoiceDetailResponse,
} from "@/src/features/invoices/infrastructure/schemas/invoice-detail.schema";
import { getInvoiceDetailMockItem } from "@/src/features/invoices/infrastructure/mocks/invoice-detail.mock";

const MOCK_LATENCY_MS = 300;

export class MockInvoiceDetailReadModel implements InvoiceDetailReadModelPort {
  async getInvoiceDetail(receiptUuid: string): Promise<InvoiceDetailDto> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const response: InvoiceDetailResponse = {
      status: 200,
      data: getInvoiceDetailMockItem(receiptUuid),
    };

    return mapInvoiceDetailDataToDto(response.data);
  }
}
