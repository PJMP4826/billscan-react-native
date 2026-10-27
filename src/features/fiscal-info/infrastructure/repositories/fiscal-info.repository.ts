import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fiscalInfoApi } from "@/src/features/fiscal-info/infrastructure/services/api/fiscal-info-api";
import { queryKeys } from "@/src/features/fiscal-info/infrastructure/constants/queryKeys";
import { createFiscalInfoReadModel } from "@/src/features/fiscal-info/infrastructure/factories/fiscal-info-read-model.factory";

export const useFiscalInfoQuery = () =>
  useQuery({
    queryKey: queryKeys.fiscalInfo.detail(),
    queryFn: () => createFiscalInfoReadModel().getFiscalInfo(),
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
