import { client } from "@/src/shared/infrastructure/adapters/http-client";
import type {
  FiscalInfoPayload,
  FiscalInfoResponse,
  FiscalInfoCreatedResponse,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";

export const fiscalInfoApi = {
  get: () => client.get<FiscalInfoResponse>("/fiscal-info"),

  create: (payload: FiscalInfoPayload) =>
    client.post<FiscalInfoCreatedResponse>("/fiscal-info", payload),
};
