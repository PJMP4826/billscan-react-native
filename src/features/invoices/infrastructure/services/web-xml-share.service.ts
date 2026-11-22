import { XmlShareError } from "@/src/features/invoices/domain/errors/invoice-xml-share.error";
import type {
  InvoiceXmlShareOptions,
  InvoiceXmlSharePort,
} from "@/src/features/invoices/domain/ports/invoice-xml-share.port";
import * as WebBrowser from "expo-web-browser";

/**
 * Fallback web: `expo-sharing` no comparte archivos locales en el navegador,
 * así que se abre el XML remoto directamente.
 */
export class WebXmlShareService implements InvoiceXmlSharePort {
  async share(
    xmlUrl: string,
    _options: InvoiceXmlShareOptions,
  ): Promise<void> {
    const url = xmlUrl.trim();

    if (!url) {
      throw new XmlShareError("No se recibió la URL del XML del CFDI.");
    }

    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      throw new XmlShareError(
        "No fue posible abrir el XML en el navegador.",
      );
    }
  }
}
