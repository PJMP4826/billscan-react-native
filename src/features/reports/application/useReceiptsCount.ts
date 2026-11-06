import { useReceiptsCountQuery } from "@/src/features/reports/infrastructure/repositories/receipts-count.repository";
import { useRefreshOnFocus } from "@/src/shared/hooks/useRefreshOnFocus";

export const useReceiptsCount = () => {
  const query = useReceiptsCountQuery();
  useRefreshOnFocus(query.refetch);

  return {
    receiptsCount: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
