import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { deductibleExpenses } from "@/src/features/reports/infrastructure/services/api/reports-api";
import { useQuery } from "@tanstack/react-query";

export const useDeductibleExpensesQuery = () =>
  useQuery({
    queryKey: queryKeys.deductibleExpenses.detail(),
    queryFn: async () => {
      const response = await deductibleExpenses.get();

      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
