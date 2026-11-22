export class XmlShareError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "XmlShareError";
  }
}

export class XmlShareUnavailableError extends Error {
  constructor(message = "Compartir archivos no está disponible en este dispositivo.") {
    super(message);
    this.name = "XmlShareUnavailableError";
  }
}

export class XmlShareDownloadError extends Error {
  constructor(message = "No fue posible descargar el XML del CFDI.") {
    super(message);
    this.name = "XmlShareDownloadError";
  }
}
