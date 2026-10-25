import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import { createRecentActivityReadModel } from "@/src/features/reports/infrastructure/factories/recent-activity-read-model.factory";
import { useQuery } from "@tanstack/react-query";

export const useRecentActivityQuery = () =>
  useQuery({
    queryKey: queryKeys.recentActivity.list(),
    queryFn: () => createRecentActivityReadModel().getRecentActivity(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
