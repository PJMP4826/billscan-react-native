import { queryKeys } from "@/src/features/invoices/infrastructure/constants/queryKeys";
import { createInvoiceDetailReadModel } from "@/src/features/invoices/infrastructure/factories/invoice-detail-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useInvoiceDetailQuery = (receiptUuid: string) =>
  useQuery({
    queryKey: queryKeys.invoices.detail(receiptUuid),
    queryFn: () => createInvoiceDetailReadModel().getInvoiceDetail(receiptUuid),
    enabled: receiptUuid.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
