import {
  XmlShareDownloadError,
  XmlShareError,
  XmlShareUnavailableError,
} from "@/src/features/invoices/domain/errors/invoice-xml-share.error";
import type {
  InvoiceXmlShareOptions,
  InvoiceXmlSharePort,
} from "@/src/features/invoices/domain/ports/invoice-xml-share.port";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";

const DEFAULT_FILE_NAME = "cfdi";

const SHARE_OPTIONS = {
  mimeType: "application/xml",
  UTI: "public.xml",
  dialogTitle: "Compartir XML del CFDI",
} as const;

/** Deja solo caracteres seguros para nombrar un archivo. */
export const sanitizeFileName = (value: string): string => {
  const sanitized = value
    .trim()
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[.-]+/, "")
    .replace(/[.-]+$/, "");

  return sanitized || DEFAULT_FILE_NAME;
};

export const buildXmlFileName = (receiptUuid: string): string =>
  `cfdi-${sanitizeFileName(receiptUuid)}.xml`;

const ensureXmlExtension = (fileName: string): string =>
  fileName.toLowerCase().endsWith(".xml") ? fileName : `${fileName}.xml`;

/**
 * Descarga el XML del CFDI a la caché local y abre el menú nativo de
 * compartición. `expo-sharing` solo acepta URIs locales, por eso la descarga
 * es un paso obligatorio antes de compartir.
 */
export class ExpoXmlShareService implements InvoiceXmlSharePort {
  async share(
    xmlUrl: string,
    options: InvoiceXmlShareOptions,
  ): Promise<void> {
    const url = xmlUrl.trim();

    if (!url) {
      throw new XmlShareError("No se recibió la URL del XML del CFDI.");
    }

    if (!(await Sharing.isAvailableAsync())) {
      throw new XmlShareUnavailableError();
    }

    const fileName = ensureXmlExtension(
      options.fileName
        ? sanitizeFileName(options.fileName)
        : buildXmlFileName(options.receiptUuid),
    );

    const destination = new File(Paths.cache, fileName);

    let file: File;

    try {
      file = await File.downloadFileAsync(url, destination, {
        idempotent: true,
      });
    } catch {
      // En Android una descarga fallida puede dejar un archivo parcial.
      try {
        if (destination.exists) {
          destination.delete();
        }
      } catch {
        // La limpieza es best-effort; no debe ocultar el error original.
      }

      throw new XmlShareDownloadError();
    }

    try {
      await Sharing.shareAsync(file.uri, SHARE_OPTIONS);
    } catch {
      throw new XmlShareError(
        "No fue posible abrir el menú para compartir el XML del CFDI.",
      );
    }
  }
}
