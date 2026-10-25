import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { createMonthlyInvoicingReadModel } from "@/src/features/reports/infrastructure/factories/monthly-invoicing-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useMonthlyInvoicingQuery = (period: string = "month") =>
  useQuery({
    queryKey: queryKeys.monthlyInvoicing.detail(period),
    queryFn: () =>
      createMonthlyInvoicingReadModel().getMonthlyInvoicing({ period }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
