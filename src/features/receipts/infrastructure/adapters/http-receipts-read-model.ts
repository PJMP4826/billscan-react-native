import type { ReceiptsPageDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";
import type {
  GetReceiptsParams,
  ReceiptsReadModelPort,
} from "@/src/features/receipts/domain/ports/receipts-read-model.port";
import { mapReceiptsListResponseToDto } from "@/src/features/receipts/infrastructure/schemas/receipts-list.schema";
import { receiptsListApi } from "@/src/features/receipts/infrastructure/services/api/receipts-list-api";

export class HttpReceiptsReadModel implements ReceiptsReadModelPort {
  async getReceipts(params: GetReceiptsParams = {}): Promise<ReceiptsPageDto> {
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 20;

    const response = await receiptsListApi.get(page, pageSize);

    return mapReceiptsListResponseToDto(response);
  }
}
