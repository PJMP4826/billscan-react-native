import { queryKeys } from "@/src/features/invoices/infrastructure/constants/queryKeys";
import { createInvoicesReadModel } from "@/src/features/invoices/infrastructure/factories/invoices-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useInvoicesQuery = (page: number = 1, pageSize: number = 20) =>
  useQuery({
    queryKey: queryKeys.invoices.list(page, pageSize),
    queryFn: () =>
      createInvoicesReadModel().getInvoices({
        page,
        pageSize,
      }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
