import { queryKeys } from "@/src/features/reports/infrastructure/constants/queryKeys";
import {
    mapRecentActivityApiItemToDto
} from "@/src/features/reports/infrastructure/schemas/recent-activity.schema";
import { recentActivity } from "@/src/features/reports/infrastructure/services/api/reports-api";
import { useQuery } from "@tanstack/react-query";

export const useRecentActivityQuery = () =>
  useQuery({
    queryKey: queryKeys.recentActivity.list(),
    queryFn: async () => {
      const response = await recentActivity.get();

      return response.data.map(mapRecentActivityApiItemToDto);
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
