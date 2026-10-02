import type { InvoicesPageDto } from "@/src/features/invoices/application/dtos/invoices-list.dto";
import type {
  GetInvoicesParams,
  InvoicesReadModelPort,
} from "@/src/features/invoices/domain/ports/invoices-read-model.port";
import { invoicesListMockItems } from "@/src/features/invoices/infrastructure/mocks/invoices-list.mock";
import {
  mapInvoicesListResponseToDto,
  type InvoicesListResponse,
} from "@/src/features/invoices/infrastructure/schemas/invoices-list.schema";

const MOCK_LATENCY_MS = 300;

export class MockInvoicesReadModel implements InvoicesReadModelPort {
  async getInvoices(params: GetInvoicesParams = {}): Promise<InvoicesPageDto> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;

    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const items = invoicesListMockItems;
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;

    const response: InvoicesListResponse = {
      status: 200,
      data: {
        cfdis: items.slice(start, start + pageSize),
        total,
        page,
        page_size: pageSize,
        total_pages: totalPages,
      },
    };

    return mapInvoicesListResponseToDto(response);
  }
}
