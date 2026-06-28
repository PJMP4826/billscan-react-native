import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fiscalInfoApi } from "@/src/features/fiscal-info/infrastructure/services/api/fiscal-info-api";
import { queryKeys } from "@/src/features/fiscal-info/infrastructure/constants/queryKeys";

export const useFiscalInfoQuery = () =>
  useQuery({
    queryKey: queryKeys.fiscalInfo.detail(),
    queryFn: async () => {
      try {
        return await fiscalInfoApi.get();
      } catch (error: any) {
        // 404 = no fiscal info yet, not a real error
        // return null so the app can react to it without throwing
        if (error?.status === 404) return null;
        throw error; // re-throw everything else (500, network, etc.)
      }
    },
    staleTime: 1000 * 60 * 60 * 24, // 24h — fiscal data rarely changes
    retry: false, // don't retry on 404
  });

export const useCreateFiscalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fiscalInfoApi.create,
    onSuccess: (data) => {
      // seed cache immediately — no refetch needed
      queryClient.setQueryData(queryKeys.fiscalInfo.detail(), data);
    },
  });
};
