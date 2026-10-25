import type { ReceiptsCountDto } from "@/src/features/reports/application/dtos/receipts-count.dto";
import type { ReceiptsCountReadModelPort } from "@/src/features/reports/domain/ports/receipts-count-read-model.port";
import { mapReceiptsCountApiItemToDto } from "@/src/features/reports/infrastructure/schemas/receipts-count.schema";
import { receiptsCount } from "@/src/features/reports/infrastructure/services/api/reports-api";

export class HttpReceiptsCountReadModel implements ReceiptsCountReadModelPort {
  async getReceiptsCount(): Promise<ReceiptsCountDto> {
    const response = await receiptsCount.get();

    return mapReceiptsCountApiItemToDto(response.data);
  }
}
