import type {
  GetReceiptsParams,
  ReceiptsReadModelPort,
} from "@/src/features/receipts/domain/ports/receipts-read-model.port";
import { receiptsListMockItems } from "@/src/features/receipts/infrastructure/mocks/receipts-list.mock";
import {
  mapReceiptsListResponseToDto,
  type ReceiptsListResponse,
} from "@/src/features/receipts/infrastructure/schemas/receipts-list.schema";
import type { ReceiptsPageDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";

const MOCK_LATENCY_MS = 300;

export class MockReceiptsReadModel implements ReceiptsReadModelPort {
  async getReceipts(params: GetReceiptsParams = {}): Promise<ReceiptsPageDto> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;
    const { status } = params;

    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const items = status
      ? receiptsListMockItems.filter((item) => item.estado === status)
      : receiptsListMockItems;
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;

    const response: ReceiptsListResponse = {
      status: 200,
      data: {
        receipts: items.slice(start, start + pageSize),
        total,
        page,
        page_size: pageSize,
        total_pages: totalPages,
      },
    };

    return mapReceiptsListResponseToDto(response);
  }
}
