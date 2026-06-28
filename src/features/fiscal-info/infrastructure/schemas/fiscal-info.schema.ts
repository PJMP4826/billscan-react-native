import { z } from "zod";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";

export const InvoiceUseEnum = z.enum(InvoiceUse);

// Lo que el usuario llena en el form se envia al backend
export const fiscalInfoSchema = z.object({
  rfc: z
    .string()
    .min(12, "RFC debe tener mínimo 12 caracteres")
    .max(13, "RFC debe tener máximo 13 caracteres")
    .toUpperCase(),
  razon_social: z.string().min(1, "Razón social requerida"),
  email: z.string().email("Email inválido"),
  cp: z.string().length(5, "El CP debe tener exactamente 5 dígitos"),
  address: z.string().optional(),
  regimen_code: z.string().min(1, "Régimen fiscal requerido"),
  use_cfdi_code_default: InvoiceUseEnum,
});

// El objeto anidado que regresa el backend para el régimen
const regimenSchema = z.object({
  code: z.string(),
  description: z.string(),
  fecha_alta: z.string(),
});

// Lo que el backend realmente regresa — diferente al input
export const fiscalInfoResponseSchema = z.object({
  rfc: z.string(),
  razon_social: z.string(),
  email: z.string(),
  cp: z.string(),
  address: z.string().nullable(),
  use_cfdi_default: InvoiceUseEnum,
  regimen_actual: regimenSchema.nullable(),
});

// POST response
export const fiscalInfoCreatedResponseSchema = z.object({
  status: z.literal(201),
  message: z.string(),
});

export type FiscalInfoPayload = z.infer<typeof fiscalInfoSchema>;
export type FiscalInfoResponse = z.infer<typeof fiscalInfoResponseSchema>;
export type FiscalInfoCreatedResponse = z.infer<
  typeof fiscalInfoCreatedResponseSchema
>;
export type Regimen = z.infer<typeof regimenSchema>;
