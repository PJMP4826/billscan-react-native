import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { receiptsApi } from "@/src/features/capture/infrastructure/services/api/receipts-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ReceiptSubmitVariables = {
  images: CapturedImage[];
  autoBilling: boolean;
};

export function useReceiptSubmit() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error, reset } = useMutation({
    mutationFn: ({ images, autoBilling }: ReceiptSubmitVariables) =>
      receiptsApi.upload(images, autoBilling),

    onSuccess: () => {
      // invalidate the receipts list so it refetches automatically
      queryClient.invalidateQueries({ queryKey: ["receipts"] });
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
