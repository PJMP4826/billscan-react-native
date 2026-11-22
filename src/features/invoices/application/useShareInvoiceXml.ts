import { createInvoiceXmlShareService } from "@/src/features/invoices/infrastructure/factories/xml-share.factory";
import { getApiErrorMessage } from "@/src/shared/infrastructure/adapters/http-client";
import { useState } from "react";

const DEFAULT_ERROR_MESSAGE =
  "No fue posible compartir el XML del CFDI.";

export interface ShareInvoiceXmlResult {
  success: boolean;
  error?: string;
}

/**
 * Descarga el XML del CFDI y dispara el menú nativo de compartición.
 * Expone el estado de la operación; el feedback visual (toast) queda en el
 * contenedor de la pantalla.
 */
export function useShareInvoiceXml() {
  const [isSharing, setIsSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const share = async (
    xmlUrl: string | null | undefined,
    receiptUuid: string,
  ): Promise<ShareInvoiceXmlResult> => {
    if (!xmlUrl?.trim()) {
      const error = "El CFDI no tiene un XML disponible.";
      setShareError(error);
      return { success: false, error };
    }

    try {
      setIsSharing(true);
      setShareError(null);

      await createInvoiceXmlShareService().share(xmlUrl, { receiptUuid });

      return { success: true };
    } catch (error) {
      const message = getApiErrorMessage(error, DEFAULT_ERROR_MESSAGE);
      setShareError(message);
      return { success: false, error: message };
    } finally {
      setIsSharing(false);
    }
  };

  return {
    isSharing,
    shareError,
    share,
  };
}
