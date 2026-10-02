import type { InvoicesListResponse } from "@/src/features/invoices/infrastructure/schemas/invoices-list.schema";
import { client } from "@/src/shared/infrastructure/adapters/http-client";

export const invoicesListApi = {
  get: (page: number = 1, pageSize: number = 20) =>
    client.get<InvoicesListResponse>(
      `/cfdis?page=${page}&page_size=${pageSize}`,
    ),
};
