import type { ReceiptsListResponse } from "@/src/features/receipts/infrastructure/schemas/receipts-list.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const receiptsListApi = {
  get: (page: number = 1, pageSize: number = 20) =>
    client.get<ReceiptsListResponse>(
      `/receipts?page=${page}&page_size=${pageSize}`,
    ),
};
