import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { monthlyInvoicing } from "@/src/features/reports/infrastructure/services/api/reports-api";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyInvoicingQuery = (period: string = "month") =>
  useQuery({
    queryKey: queryKeys.monthlyInvoicing.detail(period),
    queryFn: async () => {
      const response = await monthlyInvoicing.get(period);

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
