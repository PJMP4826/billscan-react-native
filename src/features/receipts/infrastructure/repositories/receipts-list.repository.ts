import { queryKeys } from "@/src/features/receipts/infrastructure/constants/queryKeys";
import { createReceiptsReadModel } from "@/src/features/receipts/infrastructure/factories/receipts-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useReceiptsQuery = (page: number = 1, pageSize: number = 20) =>
  useQuery({
    queryKey: queryKeys.receipts.list(page, pageSize),
    queryFn: () =>
      createReceiptsReadModel().getReceipts({
        page,
        pageSize,
      }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
