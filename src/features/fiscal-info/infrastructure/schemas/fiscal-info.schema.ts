import type { FiscalInfoDto } from "@/src/features/fiscal-info/application/dtos/fiscal-info.dto";
import type { RegimenFiscalDto } from "@/src/features/fiscal-info/application/dtos/regimen-fiscal.dto";
import type { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { InvoiceUse as InvoiceUseValue } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
import { z } from "zod";

export const InvoiceUseEnum = z.enum(InvoiceUseValue);

// Un régimen fiscal dentro del formulario. El backend espera `fecha_alta_sat`
// como datetime, por eso el payload se serializa con `toSatDateTime`.
export const regimenFiscalPayloadSchema = z.object({
  code: z.string().min(1, "Régimen fiscal requerido"),
  fecha_alta_sat: z.string().min(1, "Fecha de alta en el SAT requerida"),
});

// Lo que el usuario llena en el form se envia al backend
export const fiscalInfoSchema = z.object({
  rfc: z
    .string()
    .min(12, "RFC debe tener mínimo 12 caracteres")
    .max(13, "RFC debe tener máximo 13 caracteres")
    .toUpperCase(),
  razon_social: z.string().min(1, "Razón social requerida"),
  email: z.email("Email inválido"),
  cp: z.string().length(5, "El CP debe tener exactamente 5 dígitos"),
  address: z.string().optional(),
  regimenes: z
    .array(regimenFiscalPayloadSchema)
    .min(1, "Selecciona al menos un régimen fiscal"),
  use_cfdi_code_default: InvoiceUseEnum,
});

// POST response
export const fiscalInfoCreatedResponseSchema = z.object({
  status: z.literal(201),
  message: z.string(),
});

export type FiscalInfoPayload = z.infer<typeof fiscalInfoSchema>;
export type FiscalInfoCreatedResponse = z.infer<
  typeof fiscalInfoCreatedResponseSchema
>;

/* ══════════════════════════════════════════════════════════════════════════
 * Contrato crudo de la API (snake_case) para GET /fiscal-info
 * ══════════════════════════════════════════════════════════════════════════ */

export interface FiscalInfoRegimenApi {
  code?: string | null;
  description?: string | null;
  fecha_alta?: string | null;
}

export interface FiscalInfoApiItem {
  rfc?: string | null;
  razon_social?: string | null;
  email?: string | null;
  cp?: string | null;
  address?: string | null;
  use_cfdi_default?: string | null;
  /** El backend regresa el régimen vigente; la UI lo consume como colección. */
  regimenes: FiscalInfoRegimenApi[];
}

export interface FiscalInfoResponse {
  status: number;
  /** La API devuelve los datos fiscales directamente en `data` (sin envoltorio). */
  data: FiscalInfoApiItem;
}

/* ══════════════════════════════════════════════════════════════════════════
 * Mapeo API (snake_case, todo nullable) → DTO de dominio (snake_case)
 * ══════════════════════════════════════════════════════════════════════════ */

const mapRegimen = (
  regimen: FiscalInfoRegimenApi | null | undefined,
): RegimenFiscalDto => ({
  code: (regimen?.code ?? TaxRegime.R601) as TaxRegime,
  description: regimen?.description?.trim() || "Régimen sin descripción",
  fecha_alta: regimen?.fecha_alta ?? "",
});

export const mapFiscalInfoApiItemToDto = (
  item: FiscalInfoApiItem,
): FiscalInfoDto => ({
  rfc: item.rfc ?? "",
  razon_social: item.razon_social?.trim() || "",
  email: item.email ?? "",
  cp: item.cp ?? "",
  address: item.address ?? "",
  use_cfdi_default: (item.use_cfdi_default ?? "G03") as InvoiceUse,
  regimenes: item.regimenes.map((r) => mapRegimen(r)),
});

export const mapFiscalInfoResponseToDto = (
  response: FiscalInfoResponse,
): FiscalInfoDto => mapFiscalInfoApiItemToDto(response.data);
