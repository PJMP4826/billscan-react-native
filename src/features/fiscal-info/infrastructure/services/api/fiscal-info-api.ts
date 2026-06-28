import { client } from "@/src/shared/infrastructure/adapters/http-client";
import type {
  FiscalInfoPayload,
  FiscalInfoResponse,
  FiscalInfoCreatedResponse,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";

const mockApiResponse = {
  rfc: "XAXX010101000",
  razon_social: "PUBLICO EN GENERAL S.A. DE C.V.",
  email: "contacto@empresa.com",
  cp: "06000",
  address: "Av. Paseo de la Reforma 123, Col. Centro, Cuauhtémoc, CDMX",
  use_cfdi_default: "G03", // Gastos en general (común en CFDI)
  regimen_actual: {
    code: "601", // General de Ley Personas Morales
    description: "General de Ley Personas Morales",
    fecha_alta: "2024-01-15",
  },
};

export const fiscalInfoApi = {
  //   get: () => client.get<FiscalInfoResponse>("/fiscal-info"),
  get: async () => {
    const error: any = new Error("Fiscal info not found");
    error.status = 404;
    throw error;
  },
  create: (payload: FiscalInfoPayload) =>
    client.post<FiscalInfoCreatedResponse>("/fiscal-info", payload),
};
