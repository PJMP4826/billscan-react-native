import {
  useFiscalInfoQuery,
  useCreateFiscalInfo,
} from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import type { FiscalInfoPayload } from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";

export const useFiscalInfoSetup = () => {
  const query = useFiscalInfoQuery();
  const mutation = useCreateFiscalInfo();

  const needsSetup = !query.isLoading && query.data === null;
  console.log(query.data);
  
  console.log(needsSetup);

  const submit = (payload: FiscalInfoPayload) => {
    mutation.mutate(payload);
  };

  return {
    fiscalInfo: query.data,
    isLoading: query.isLoading,
    needsSetup, // ← this is what triggers the modal
    submit,
    isSubmitting: mutation.isPending,
    submitError: mutation.error,
    submitSuccess: mutation.isSuccess,
  };
};
