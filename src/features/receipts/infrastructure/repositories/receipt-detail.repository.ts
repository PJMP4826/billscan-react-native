import { queryKeys } from "@/src/features/receipts/infrastructure/constants/queryKeys";
import { createReceiptDetailReadModel } from "@/src/features/receipts/infrastructure/factories/receipt-detail-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useReceiptDetailQuery = (receiptUuid: string) =>
  useQuery({
    queryKey: queryKeys.receipts.detail(receiptUuid),
    queryFn: () => createReceiptDetailReadModel().getReceiptDetail(receiptUuid),
    enabled: receiptUuid.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
