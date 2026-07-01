import { Platform } from "react-native";
import { client } from "../../../../../shared/infrastructure/adapters/http-client";
import { ReceiptUploadResponse } from "../../../domain/records/ReceiptUploadResponse";
import { CapturedImage } from "../../../domain/value_objects/captured-image.value_object";

const buildFormData = async (images: CapturedImage[]): Promise<FormData> => {
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

  return formData;
};

export const receiptsApi = {
  upload: async (images: CapturedImage[]): Promise<ReceiptUploadResponse> => {
    const formData = await buildFormData(images);
    return client.post<ReceiptUploadResponse>("/receipts", formData);
  },
};
