import { useRecentActivityQuery } from "@/src/features/reports/infrastructure/repositories/recent-activity.repository";

interface RecentActivityRowViewModel {
  merchant: string;
  fileUrl: string;
  createdAtLabel: string;
  totalLabel: string;
}

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

const formatDateLabel = (value: string) => {
  const [datePart] = value.split(" ");
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
};

export const useRecentActivity = () => {
  const query = useRecentActivityQuery();

  return {
    recentActivity: query.data
      ? query.data.map(
          (item): RecentActivityRowViewModel => ({
            merchant: item.merchant,
            fileUrl: item.fileUrl,
            createdAtLabel: formatDateLabel(item.createdAt),
            totalLabel: formatCurrency(item.total),
          }),
        )
      : [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
