export interface InvoiceXmlShareOptions {
  /** UUID del CFDI; se usa para nombrar el archivo descargado. */
  receiptUuid: string;
  /** Nombre de archivo explícito. Si se omite, se deriva de `receiptUuid`. */
  fileName?: string;
}

export interface InvoiceXmlSharePort {
  /**
   * Descarga el XML remoto a almacenamiento local y lo comparte con otras apps.
   * La URL remota no se puede compartir directamente porque las APIs de
   * compartición solo aceptan URIs locales.
   */
  share(xmlUrl: string, options: InvoiceXmlShareOptions): Promise<void>;
}
