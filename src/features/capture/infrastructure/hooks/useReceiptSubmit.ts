import { type ReceiptUploadResponse } from "@/src/features/capture/domain/records/receipt-upload-response.record";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { receiptsApi } from "@/src/features/capture/infrastructure/services/api/receipts-api";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ReceiptSubmitVariables = {
  images: CapturedImage[];
  autoBilling: boolean;
  usoCfdi: InvoiceUse;
  regimen: TaxRegime;
};

export function useReceiptSubmit() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error, reset } = useMutation<
    ReceiptUploadResponse,
    Error,
    ReceiptSubmitVariables
  >({
    mutationFn: ({ images, autoBilling, usoCfdi, regimen }: ReceiptSubmitVariables) =>
      receiptsApi.upload(images, autoBilling, usoCfdi, regimen),

    onSuccess: (response) => {
      if (response.status === 202) {
        queryClient.invalidateQueries({ queryKey: ["receipts"] });
      }
    },
  });

  return {
    submit: mutateAsync,
    isSubmitting: isPending,
    isError,
    error,
    reset,
  };
}
