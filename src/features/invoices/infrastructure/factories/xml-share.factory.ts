import type { InvoiceXmlSharePort } from "@/src/features/invoices/domain/ports/invoice-xml-share.port";
import { WebXmlShareService } from "@/src/features/invoices/infrastructure/services/web-xml-share.service";
import { ExpoXmlShareService } from "@/src/features/invoices/infrastructure/services/xml-share.service";
import { Platform } from "react-native";

/**
 * En web no es posible compartir archivos locales; se abre el XML remoto.
 * En nativo se descarga a la caché y se comparte con `expo-sharing`.
 */
export function createInvoiceXmlShareService(): InvoiceXmlSharePort {
  if (Platform.OS === "web") {
    return new WebXmlShareService();
  }

  return new ExpoXmlShareService();
}
