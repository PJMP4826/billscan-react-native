import type { ReceiptsListResponse } from "@/src/features/receipts/infrastructure/schemas/receipts-list.schema";
import type { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const receiptsListApi = {
  get: (page: number = 1, pageSize: number = 20, status?: ReceiptStatus) =>
    client.get<ReceiptsListResponse>(
      `/receipts?page=${page}&page_size=${pageSize}${
        status ? `&status=${status}` : ""
      }`,
    ),
};
