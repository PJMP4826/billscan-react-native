import { useReceiptsCountQuery } from "@/src/features/reports/infrastructure/repositories/receipts-count.repository";
import { useRefreshOnFocus } from "@/src/shared/hooks/useRefreshOnFocus";

const formatCurrency = (value: string) => {
  const numericValue = Number.parseFloat(value);

  if (Number.isNaN(numericValue)) {
    return value;
  }

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export const useTotalSpent = () => {
  const query = useReceiptsCountQuery();
  useRefreshOnFocus(query.refetch);
  const receiptsCount = query.data ?? null;

  return {
    totalSpent: receiptsCount
      ? { formattedAmount: formatCurrency(receiptsCount.totalSpent) }
      : null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
