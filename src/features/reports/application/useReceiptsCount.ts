import { mapReceiptsCountApiItemToDto } from "@/src/features/reports/infrastructure/schemas/receipts-count.schema";
import { useReceiptsCountQuery } from "@/src/features/reports/infrastructure/repositories/receipts-count.repository";

export const useReceiptsCount = () => {
  const query = useReceiptsCountQuery();

  return {
    receiptsCount: query.data
      ? mapReceiptsCountApiItemToDto(query.data)
      : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
