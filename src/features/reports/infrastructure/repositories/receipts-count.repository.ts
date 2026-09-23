import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { receiptsCount } from "@/src/features/reports/infrastructure/services/api/reports-api";
import { useQuery } from "@tanstack/react-query";

export const useReceiptsCountQuery = () =>
  useQuery({
    queryKey: queryKeys.receiptsCount.detail(),
    queryFn: async () => {
      const response = await receiptsCount.get();

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
