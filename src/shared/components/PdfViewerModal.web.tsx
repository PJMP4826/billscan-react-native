import type { PdfViewerModalProps } from "@/src/shared/components/PdfViewerModal.types";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

/**
 * Fallback web: `react-native-pdf` solo tiene implementación nativa, así que
 * abrimos la URL prefirmada en el navegador del sistema.
 */
export function PdfViewerModal({ uri, onClose }: PdfViewerModalProps) {
  useEffect(() => {
    if (!uri) return;

    void WebBrowser.openBrowserAsync(uri);
    onClose();
    // `onClose` se omite a propósito para no reabrir el navegador en cada render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return null;
}
