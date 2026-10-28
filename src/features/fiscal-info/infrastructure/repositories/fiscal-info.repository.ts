import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/src/features/fiscal-info/infrastructure/constants/queryKeys";
import { createFiscalInfoReadModel } from "@/src/features/fiscal-info/infrastructure/factories/fiscal-info-read-model.factory";
import { fiscalInfoApi } from "@/src/features/fiscal-info/infrastructure/services/api/fiscal-info-api";

export const useFiscalInfoQuery = () =>
  useQuery({
    queryKey: queryKeys.fiscalInfo.detail(),
    queryFn: () => createFiscalInfoReadModel().getFiscalInfo(),
    staleTime: 1000 * 60 * 60 * 24, // 24h — fiscal data rarely changes
    retry: false, // don't retry on 404
  });

interface UseCreateFiscalInfoOptions {
  onSuccess?: () => void;
}

export const useCreateFiscalInfo = (options?: UseCreateFiscalInfoOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fiscalInfoApi.create,
    onSuccess: async () => {
      // El POST sólo regresa {status, message}: hay que refrescar el detalle.
      await queryClient.invalidateQueries({
        queryKey: queryKeys.fiscalInfo.all,
      });
      options?.onSuccess?.();
    },
  });
};
