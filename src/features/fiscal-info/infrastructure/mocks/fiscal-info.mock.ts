import type { FiscalInfoApiItem } from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";

export const fiscalInfoMockItem: FiscalInfoApiItem = {
  rfc: "XAXX010101000",
  razon_social: "PUBLICO EN GENERAL S.A. DE C.V.",
  email: "contacto@empresa.com",
  cp: "06000",
  address: "Av. Paseo de la Reforma 123, Col. Centro, Cuauhtémoc, CDMX",
  use_cfdi_default: "G03", // Gastos en general (común en CFDI)
  // regimen_actual: {
  //   code: "616",
  //   description: "Sin obligaciones fiscales",
  //   fecha_alta: "2025-02-19",
  // },
  regimenes: [
    {
      code: TaxRegime.R616,
      description: "Sin obligaciones fiscales",
      fecha_alta: "2025-02-19",
    },
  ],
};

export const getFiscalInfoMockItem = (): FiscalInfoApiItem =>
  fiscalInfoMockItem;
