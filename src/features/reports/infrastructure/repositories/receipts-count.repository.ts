import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { createReceiptsCountReadModel } from "@/src/features/reports/infrastructure/factories/receipts-count-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useReceiptsCountQuery = () =>
  useQuery({
    queryKey: queryKeys.receiptsCount.detail(),
    queryFn: () => createReceiptsCountReadModel().getReceiptsCount(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
