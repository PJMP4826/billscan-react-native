import { ReceiptUploadResponse } from "@/src/features/capture/domain/records/receipt-upload-response.record";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { client } from "@/src/shared/infrastructure/adapters/http-client";
import { Platform } from "react-native";

const buildFormData = async (
  images: CapturedImage[],
  auto_billing: boolean = false,
): Promise<FormData> => {
  const formData = new FormData();

  for (const image of images) {
    if (Platform.OS === "web") {
      const blob = await fetch(image.uri).then((r) => r.blob());
      formData.append("files[]", blob, image.fileName);
    } else {
      formData.append("files[]", {
        uri: image.uri,
        type: image.mimeType,
        name: image.fileName,
      } as any);
    }
  }

  formData.append("auto_billing", String(auto_billing));

  return formData;
};

export const receiptsApi = {
  upload: async (
    images: CapturedImage[],
    auto_billing: boolean,
  ): Promise<ReceiptUploadResponse> => {
    const formData = await buildFormData(images, auto_billing);
    return client.post<ReceiptUploadResponse>("/receipts", formData);
  },
};
