import { queryKeys } from "@/src/features/receipts/infrastructure/constants/queryKeys";
import { createReceiptsReadModel } from "@/src/features/receipts/infrastructure/factories/receipts-read-model.factory";
import type { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { useQuery } from "@tanstack/react-query";

export const useReceiptsQuery = (
  page: number = 1,
  pageSize: number = 20,
  status?: ReceiptStatus,
) =>
  useQuery({
    queryKey: queryKeys.receipts.list(page, pageSize, status),
    queryFn: () =>
      createReceiptsReadModel().getReceipts({
        page,
        pageSize,
        status,
      }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
