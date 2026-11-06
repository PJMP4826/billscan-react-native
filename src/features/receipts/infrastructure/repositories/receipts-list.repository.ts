import type { ReceiptsPageDto } from "@/src/features/receipts/application/dtos/receipts-list.dto";
import { queryKeys } from "@/src/features/receipts/infrastructure/constants/queryKeys";
import { createReceiptsReadModel } from "@/src/features/receipts/infrastructure/factories/receipts-read-model.factory";
import { ReceiptStatus } from "@/src/features/receipts/domain/enums/receipt-status.enum";
import { receiptPollingWindow } from "@/src/shared/infrastructure/polling/receipt-polling-window";
import { useQuery } from "@tanstack/react-query";

const PROCESSING_POLLING_INTERVAL_MS = 5_000;

const hasProcessingReceipts = (data?: ReceiptsPageDto) =>
  data?.receipts.some(
    (receipt) => receipt.status === ReceiptStatus.PROCESSING,
  ) ?? false;

const shouldPollReceipts = (data?: ReceiptsPageDto) =>
  receiptPollingWindow.isActive() || hasProcessingReceipts(data);

export const useReceiptsQuery = (
  page: number = 1,
  pageSize: number = 20,
  status?: ReceiptStatus,
) =>
  useQuery({
    queryKey: queryKeys.receipts.list(page, pageSize, status),
    queryFn: () =>
      createReceiptsReadModel().getReceipts({
        page,
        pageSize,
        status,
      }),
    staleTime: 1000 * 30,
    refetchInterval: (query) =>
      shouldPollReceipts(query.state.data)
        ? PROCESSING_POLLING_INTERVAL_MS
        : false,
    retry: false,
  });
