import type { ReceiptsCountDto } from "@/src/features/reports/application/dtos/receipts-count.dto";
import type { ReceiptsCountReadModelPort } from "@/src/features/reports/domain/ports/receipts-count-read-model.port";
import { receiptsCountMockItem } from "@/src/features/reports/infrastructure/mocks/receipts-count.mock";
import {
  mapReceiptsCountApiItemToDto,
  type ReceiptsCountResponse,
} from "@/src/features/reports/infrastructure/schemas/receipts-count.schema";

const MOCK_LATENCY_MS = 300;

export class MockReceiptsCountReadModel implements ReceiptsCountReadModelPort {
  async getReceiptsCount(): Promise<ReceiptsCountDto> {
    await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));

    const response: ReceiptsCountResponse = {
      status: 200,
      data: receiptsCountMockItem,
    };

    return mapReceiptsCountApiItemToDto(response.data);
  }
}
