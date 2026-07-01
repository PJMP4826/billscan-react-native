import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CapturedImage } from "../features/capture/domain/value_objects/captured-image.value_object";
import { receiptsApi } from "../features/capture/infrastructure/services/api/receiptsApi";

export function useReceiptSubmit() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error, reset } = useMutation({
    mutationFn: (images: CapturedImage[]) => receiptsApi.upload(images),

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
