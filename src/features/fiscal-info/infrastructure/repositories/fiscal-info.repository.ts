import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { FiscalInfoCsfInput } from "@/src/features/fiscal-info/domain/ports/fiscal-info-csf.port";
import { queryKeys } from "@/src/features/fiscal-info/infrastructure/constants/queryKeys";
import { createFiscalInfoCsf } from "@/src/features/fiscal-info/infrastructure/factories/fiscal-info-csf.factory";
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

export const useCreateFiscalInfoFromCsf = (
  options?: UseCreateFiscalInfoOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: FiscalInfoCsfInput) =>
      createFiscalInfoCsf().createFromCsf(input),
    onSuccess: () => {
      // La CSF sólo regresa {status, message}: se cierra el flujo de inmediato
      // y el detalle se refresca en segundo plano.
      options?.onSuccess?.();
      void queryClient.invalidateQueries({
        queryKey: queryKeys.fiscalInfo.all,
      });
    },
  });
};
