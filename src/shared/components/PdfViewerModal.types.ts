export interface PdfViewerModalProps {
  /** URL prefirmada del PDF. `null` cierra el visor. */
  uri: string | null;
  /** Se invoca al cerrar el visor (o tras abrir el fallback web). */
  onClose: () => void;
}
