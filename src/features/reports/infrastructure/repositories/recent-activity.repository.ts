import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { createRecentActivityReadModel } from "@/src/features/reports/infrastructure/factories/recent-activity-read-model.factory";
import { receiptPollingWindow } from "@/src/shared/infrastructure/polling/receipt-polling-window";
import { useQuery } from "@tanstack/react-query";

const WINDOW_POLLING_INTERVAL_MS = 10_000;

export const useRecentActivityQuery = () =>
  useQuery({
    queryKey: queryKeys.recentActivity.list(),
    queryFn: () => createRecentActivityReadModel().getRecentActivity(),
    staleTime: 1000 * 60 * 5,
    refetchInterval: () =>
      receiptPollingWindow.isActive() ? WINDOW_POLLING_INTERVAL_MS : false,
    retry: false,
  });
