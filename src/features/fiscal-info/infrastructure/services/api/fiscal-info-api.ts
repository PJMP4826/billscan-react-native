import { client } from "@/src/shared/infrastructure/adapters/http-client";
import type {
  FiscalInfoCreatedResponse,
  FiscalInfoPayload,
  FiscalInfoResponse,
  FiscalRegimensResponse,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import type { FiscalInfoCsfInput } from "@/src/features/fiscal-info/domain/ports/fiscal-info-csf.port";
import { Platform } from "react-native";

const buildCsfFormData = async ({
  file,
  email,
  useCfdiCodeDefault,
}: FiscalInfoCsfInput): Promise<FormData> => {
  const formData = new FormData();

  if (Platform.OS === "web") {
    const blob = await fetch(file.uri).then((response) => response.blob());
    formData.append("file", blob, file.fileName);
  } else {
    formData.append("file", {
      uri: file.uri,
      type: file.mimeType,
      name: file.fileName,
    } as any);
  }

  formData.append("email", email);
  formData.append("use_cfdi_code_default", useCfdiCodeDefault);

  return formData;
};

export const fiscalInfoApi = {
  get: () => client.get<FiscalInfoResponse>("/fiscal-info"),
  getRegimens: () =>
    client.get<FiscalRegimensResponse>("/fiscal-info/regimens"),
  create: (payload: FiscalInfoPayload) =>
    client.post<FiscalInfoCreatedResponse>("/fiscal-info", payload),
  createFromCsf: async (
    input: FiscalInfoCsfInput,
  ): Promise<FiscalInfoCreatedResponse> => {
    const formData = await buildCsfFormData(input);
    return client.post<FiscalInfoCreatedResponse>("/fiscal-info/csf", formData);
  },
};
