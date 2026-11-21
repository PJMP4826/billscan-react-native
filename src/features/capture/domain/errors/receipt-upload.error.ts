import type { ApiError } from "@/src/shared/infrastructure/adapters/http-client";

export type ReceiptBusinessErrorCode =
  | "NO_FILES_PROVIDED"
  | "VALIDATION_ERROR"
  | "INVALID_FILE_TYPE"
  | "UNRECOGNIZED_FILE"
  | "FISCAL_INFO_REQUIRED"
  | "INVALID_FISCAL_DATA"
  | "UNKNOWN_INVOICE_USE"
  | "UNKNOWN_TAX_REGIME"
  | "INVOICE_USE_TAX_REGIME_MISMATCH"
  | "INVOICE_USE_NO_COMPATIBLE_REGIMEN"
  | "INVOICE_USE_PERSON_TYPE_MISMATCH"
  | "TAX_REGIME_PERSON_TYPE_MISMATCH"
  | "REGIMEN_NOT_REGISTERED"
  | "NO_REGISTERED_REGIMENS"
  | "INVOICE_QUOTA_EXCEEDED";

export type ReceiptUploadAction =
  | "retry"
  | "fiscal-setup"
  | "choose-fiscal-data"
  | "recapture"
  | "quota"
  | "generic";

interface ReceiptUploadErrorInput {
  code?: string;
  status: number;
  title: string;
  userMessage: string;
  displayMessage: string;
  serverMessage?: string;
  action: ReceiptUploadAction;
  ctaLabel: string;
  details: Record<string, unknown>;
}

export class ReceiptUploadError extends Error {
  readonly code?: string;
  readonly status: number;
  readonly title: string;
  readonly userMessage: string;
  readonly displayMessage: string;
  readonly serverMessage?: string;
  readonly action: ReceiptUploadAction;
  readonly ctaLabel: string;
  readonly details: Record<string, unknown>;

  constructor({
    code,
    status,
    title,
    userMessage,
    displayMessage,
    serverMessage,
    action,
    ctaLabel,
    details,
  }: ReceiptUploadErrorInput) {
    super(displayMessage);
    this.name = "ReceiptUploadError";
    this.code = code;
    this.status = status;
    this.title = title;
    this.userMessage = userMessage;
    this.displayMessage = displayMessage;
    this.serverMessage = serverMessage;
    this.action = action;
    this.ctaLabel = ctaLabel;
    this.details = details;
  }
}

const FISCAL_SETUP_CODES: ReceiptBusinessErrorCode[] = [
  "FISCAL_INFO_REQUIRED",
  "NO_REGISTERED_REGIMENS",
  "INVALID_FISCAL_DATA",
];

const FISCAL_SELECTION_CODES: ReceiptBusinessErrorCode[] = [
  "UNKNOWN_INVOICE_USE",
  "UNKNOWN_TAX_REGIME",
  "INVOICE_USE_TAX_REGIME_MISMATCH",
  "INVOICE_USE_NO_COMPATIBLE_REGIMEN",
  "INVOICE_USE_PERSON_TYPE_MISMATCH",
  "TAX_REGIME_PERSON_TYPE_MISMATCH",
  "REGIMEN_NOT_REGISTERED",
];

const RECAPTURE_CODES: ReceiptBusinessErrorCode[] = [
  "NO_FILES_PROVIDED",
  "INVALID_FILE_TYPE",
  "UNRECOGNIZED_FILE",
];

const FISCAL_SETUP_MESSAGES: Record<
  "FISCAL_INFO_REQUIRED" | "NO_REGISTERED_REGIMENS" | "INVALID_FISCAL_DATA",
  { title: string; userMessage: string; ctaLabel: string }
> = {
  FISCAL_INFO_REQUIRED: {
    title: "Faltan tus datos fiscales",
    userMessage:
      "Registra tu información fiscal antes de facturar tus tickets.",
    ctaLabel: "Registrar datos fiscales",
  },
  NO_REGISTERED_REGIMENS: {
    title: "Sin regímenes fiscales",
    userMessage:
      "No tienes regímenes fiscales registrados. Agrégalos para poder facturar.",
    ctaLabel: "Registrar datos fiscales",
  },
  INVALID_FISCAL_DATA: {
    title: "Datos fiscales incompletos",
    userMessage:
      "Tu información fiscal no es válida. Revísala y actualízala para continuar.",
    ctaLabel: "Actualizar datos fiscales",
  },
};

const FISCAL_SELECTION_MESSAGES: Record<
  | "UNKNOWN_INVOICE_USE"
  | "UNKNOWN_TAX_REGIME"
  | "INVOICE_USE_TAX_REGIME_MISMATCH"
  | "INVOICE_USE_NO_COMPATIBLE_REGIMEN"
  | "INVOICE_USE_PERSON_TYPE_MISMATCH"
  | "TAX_REGIME_PERSON_TYPE_MISMATCH"
  | "REGIMEN_NOT_REGISTERED",
  { title: string; userMessage: string; ctaLabel: string }
> = {
  UNKNOWN_INVOICE_USE: {
    title: "Uso de CFDI no disponible",
    userMessage:
      "El uso de CFDI seleccionado no está soportado. Elige otro uso para continuar.",
    ctaLabel: "Elegir otro uso de CFDI",
  },
  UNKNOWN_TAX_REGIME: {
    title: "Régimen fiscal no disponible",
    userMessage:
      "El régimen fiscal seleccionado no está soportado. Elige otro régimen para continuar.",
    ctaLabel: "Elegir otro régimen",
  },
  INVOICE_USE_TAX_REGIME_MISMATCH: {
    title: "Combinación no válida",
    userMessage:
      "El uso de CFDI no es compatible con el régimen fiscal seleccionado. Elige otra combinación.",
    ctaLabel: "Elegir otra combinación",
  },
  INVOICE_USE_NO_COMPATIBLE_REGIMEN: {
    title: "Uso de CFDI incompatible",
    userMessage:
      "Ninguno de tus regímenes registrados permite ese uso de CFDI. Elige otro uso o actualiza tus datos fiscales.",
    ctaLabel: "Elegir otro uso de CFDI",
  },
  INVOICE_USE_PERSON_TYPE_MISMATCH: {
    title: "Uso de CFDI no permitido",
    userMessage:
      "Ese uso de CFDI no aplica al tipo de persona de tu RFC. Elige otro uso.",
    ctaLabel: "Elegir otro uso de CFDI",
  },
  TAX_REGIME_PERSON_TYPE_MISMATCH: {
    title: "Régimen fiscal no permitido",
    userMessage:
      "Ese régimen fiscal no aplica al tipo de persona de tu RFC. Elige otro régimen.",
    ctaLabel: "Elegir otro régimen",
  },
  REGIMEN_NOT_REGISTERED: {
    title: "Régimen no registrado",
    userMessage:
      "El régimen fiscal seleccionado no está asociado a tu RFC. Elige uno de tus regímenes registrados.",
    ctaLabel: "Elegir otro régimen",
  },
};

const RECAPTURE_MESSAGES: Record<
  "NO_FILES_PROVIDED" | "INVALID_FILE_TYPE" | "UNRECOGNIZED_FILE",
  { title: string; userMessage: string; ctaLabel: string }
> = {
  NO_FILES_PROVIDED: {
    title: "Sin imágenes",
    userMessage: "No se recibió ninguna imagen del ticket. Vuelve a capturarlo.",
    ctaLabel: "Volver a capturar",
  },
  INVALID_FILE_TYPE: {
    title: "Formato no compatible",
    userMessage:
      "Solo se permiten imágenes JPG o PNG. Vuelve a capturar el ticket.",
    ctaLabel: "Volver a capturar",
  },
  UNRECOGNIZED_FILE: {
    title: "Imagen no reconocida",
    userMessage:
      "No pudimos reconocer el contenido de la imagen. Vuelve a capturarla.",
    ctaLabel: "Volver a capturar",
  },
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const toApiError = (error: unknown): ApiError | null => {
  if (!isRecord(error)) return null;
  if (typeof error.message !== "string") return null;

  return {
    status: typeof error.status === "number" ? error.status : 0,
    title: typeof error.title === "string" ? error.title : undefined,
    message: error.message,
    errorCode:
      typeof error.errorCode === "string" ? error.errorCode : undefined,
    details: isRecord(error.details) ? error.details : undefined,
  };
};

const toFiniteNumber = (value: unknown): number | undefined =>
  typeof value === "number" && Number.isFinite(value) ? value : undefined;

const buildQuotaMessage = (details: Record<string, unknown>): string => {
  const limit = toFiniteNumber(details.limit);
  const used = toFiniteNumber(details.used);
  const quotaLabel =
    typeof details.quota_label === "string" && details.quota_label.trim()
      ? details.quota_label.trim()
      : "disponibles";

  if (limit !== undefined && used !== undefined) {
    return `Ya usaste ${used} de ${limit} facturas ${quotaLabel} de este RFC.`;
  }

  if (limit !== undefined) {
    return `Alcanzaste el límite de ${limit} facturas ${quotaLabel} de este RFC.`;
  }

  return "Alcanzaste el límite de facturas de este RFC.";
};

const fiscalSetupError = (
  code: string,
  apiError: ApiError,
  details: Record<string, unknown>,
) => {
  const message = FISCAL_SETUP_MESSAGES[code as keyof typeof FISCAL_SETUP_MESSAGES];
  const serverMessage = apiError.message.trim();

  return new ReceiptUploadError({
    code,
    status: apiError.status,
    title: message.title,
    userMessage: message.userMessage,
    displayMessage: serverMessage || message.userMessage,
    serverMessage: serverMessage || undefined,
    action: "fiscal-setup",
    ctaLabel: message.ctaLabel,
    details,
  });
};

const fiscalSelectionError = (
  code: string,
  apiError: ApiError,
  details: Record<string, unknown>,
) => {
  const message =
    FISCAL_SELECTION_MESSAGES[code as keyof typeof FISCAL_SELECTION_MESSAGES];
  const serverMessage = apiError.message.trim();

  return new ReceiptUploadError({
    code,
    status: apiError.status,
    title: message.title,
    userMessage: message.userMessage,
    displayMessage: serverMessage || message.userMessage,
    serverMessage: serverMessage || undefined,
    action: "choose-fiscal-data",
    ctaLabel: message.ctaLabel,
    details,
  });
};

const recaptureError = (
  code: string,
  apiError: ApiError,
  details: Record<string, unknown>,
) => {
  const message = RECAPTURE_MESSAGES[code as keyof typeof RECAPTURE_MESSAGES];
  const serverMessage = apiError.message.trim();

  return new ReceiptUploadError({
    code,
    status: apiError.status,
    title: message.title,
    userMessage: message.userMessage,
    displayMessage: serverMessage || message.userMessage,
    serverMessage: serverMessage || undefined,
    action: "recapture",
    ctaLabel: message.ctaLabel,
    details,
  });
};

export const mapReceiptUploadError = (error: unknown): ReceiptUploadError => {
  const apiError = toApiError(error);
  const details = apiError?.details ?? {};
  const code = apiError?.errorCode;
  const status = apiError?.status ?? 0;
  const serverMessage = apiError?.message?.trim();

  if (
    apiError &&
    code &&
    FISCAL_SETUP_CODES.includes(code as ReceiptBusinessErrorCode)
  ) {
    return fiscalSetupError(code, apiError, details);
  }

  if (
    apiError &&
    code &&
    FISCAL_SELECTION_CODES.includes(code as ReceiptBusinessErrorCode)
  ) {
    return fiscalSelectionError(code, apiError, details);
  }

  if (
    apiError &&
    code &&
    RECAPTURE_CODES.includes(code as ReceiptBusinessErrorCode)
  ) {
    return recaptureError(code, apiError, details);
  }

  if (code === "INVOICE_QUOTA_EXCEEDED") {
    const quotaMessage = buildQuotaMessage(details);

    return new ReceiptUploadError({
      code,
      status,
      title: "Límite de facturas alcanzado",
      userMessage: quotaMessage,
      displayMessage: serverMessage || quotaMessage,
      serverMessage: serverMessage || undefined,
      action: "quota",
      ctaLabel: "Entendido",
      details,
    });
  }

  if (code === "VALIDATION_ERROR") {
    return new ReceiptUploadError({
      code,
      status,
      title: "Datos no válidos",
      userMessage: "Revisa la información enviada e intenta de nuevo.",
      displayMessage: "Revisa la información enviada e intenta de nuevo.",
      serverMessage: serverMessage || undefined,
      action: "generic",
      ctaLabel: "Entendido",
      details,
    });
  }

  if (status === 401) {
    return new ReceiptUploadError({
      code,
      status,
      title: "Sesión no válida",
      userMessage: "Tu sesión expiró. Vuelve a iniciar sesión para continuar.",
      displayMessage:
        "Tu sesión expiró. Vuelve a iniciar sesión para continuar.",
      serverMessage: serverMessage || undefined,
      action: "generic",
      ctaLabel: "Entendido",
      details,
    });
  }

  if (status >= 500) {
    return new ReceiptUploadError({
      code,
      status,
      title: "Servicio no disponible",
      userMessage:
        "Tuvimos un problema al procesar tu solicitud. Intenta nuevamente en unos momentos.",
      displayMessage:
        "Tuvimos un problema al procesar tu solicitud. Intenta nuevamente en unos momentos.",
      serverMessage: serverMessage || undefined,
      action: "retry",
      ctaLabel: "Reintentar",
      details,
    });
  }

  const fallbackMessage =
    serverMessage && serverMessage.length > 0
      ? serverMessage
      : "No fue posible enviar los tickets. Intenta nuevamente.";

  return new ReceiptUploadError({
    code,
    status,
    title: "No se pudo enviar el ticket",
    userMessage: fallbackMessage,
    displayMessage: fallbackMessage,
    serverMessage: serverMessage || undefined,
    action: "retry",
    ctaLabel: "Reintentar",
    details,
  });
};
