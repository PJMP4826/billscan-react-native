import {
  useFiscalInfoQuery,
  useCreateFiscalInfo,
} from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import type { FiscalInfoPayload } from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { toSatDateTime } from "@/src/features/fiscal-info/application/dates";

interface UseFiscalInfoSetupOptions {
  /** Se ejecuta cuando la información fiscal se guardó correctamente. */
  onSuccess?: () => void;
}

export const useFiscalInfoSetup = (options?: UseFiscalInfoSetupOptions) => {
  const query = useFiscalInfoQuery();
  const mutation = useCreateFiscalInfo({ onSuccess: options?.onSuccess });

  const needsSetup = !query.isLoading && query.data === null;

  const submit = (payload: FiscalInfoPayload) => {
    mutation.mutate({
      ...payload,
      // El backend tipa `fecha_alta_sat` como datetime (`T00:00:00`).
      regimenes: payload.regimenes.map((regimen) => ({
        ...regimen,
        fecha_alta_sat: toSatDateTime(regimen.fecha_alta_sat),
      })),
    });
  };

  return {
    fiscalInfo: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    needsSetup, // ← triggers the mandatory setup modal
    submit,
    isSubmitting: mutation.isPending,
    submitError: mutation.error,
    submitSuccess: mutation.isSuccess,
  };
};
