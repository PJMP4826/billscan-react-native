import type { CsfCaptureSource } from "@/src/features/fiscal-info/domain/enums/csf-capture-source.enum";
import type { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";
import { createCsfFileCaptureService } from "@/src/features/fiscal-info/infrastructure/factories/csf-capture-service.factory";
import { useCreateFiscalInfoFromCsf } from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import { getApiErrorMessage } from "@/src/shared/infrastructure/adapters/http-client";
import { useState } from "react";

interface UseFiscalInfoCsfOptions {
  onSuccess?: () => void;
}

interface SubmitCsfInput {
  email: string;
  useCfdiCodeDefault: InvoiceUse;
}

export function useFiscalInfoCsf(options?: UseFiscalInfoCsfOptions) {
  const [file, setFile] = useState<CsfFile | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureError, setCaptureError] = useState<string | null>(null);

  const mutation = useCreateFiscalInfoFromCsf({
    onSuccess: options?.onSuccess,
  });

  const capture = async (source: CsfCaptureSource) => {
    try {
      setIsCapturing(true);
      setCaptureError(null);
      const result = await createCsfFileCaptureService(source).capture();

      if (!result) return null;

      setFile(result);
      return result;
    } catch (error) {
      setCaptureError(
        getApiErrorMessage(
          error,
          "No fue posible capturar la constancia fiscal.",
        ),
      );
      return null;
    } finally {
      setIsCapturing(false);
    }
  };

  const submit = async ({ email, useCfdiCodeDefault }: SubmitCsfInput) => {
    if (!file) {
      throw new Error("Selecciona o captura la constancia fiscal.");
    }

    return mutation.mutateAsync({
      file,
      email,
      useCfdiCodeDefault,
    });
  };

  const reset = () => {
    setFile(null);
    setCaptureError(null);
    mutation.reset();
  };

  return {
    file,
    isCapturing,
    captureError,
    capture,
    submit,
    isSubmitting: mutation.isPending,
    submitError: mutation.error
      ? getApiErrorMessage(mutation.error)
      : null,
    isSuccess: mutation.isSuccess,
    reset,
  };
}
