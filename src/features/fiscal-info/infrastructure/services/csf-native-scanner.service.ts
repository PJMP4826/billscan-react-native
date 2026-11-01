import type { CsfFileCapturePort } from "@/src/features/fiscal-info/domain/ports/csf-file-capture.port";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";
import {
  launchScanner,
  type ImageObject,
} from "@dariyd/react-native-document-scanner";

const DEFAULT_FILE_NAME = "constancia-fiscal.jpg";
const DEFAULT_MIME_TYPE = "image/jpeg";

export class CsfNativeScannerService implements CsfFileCapturePort {
  async capture(): Promise<CsfFile | null> {
    const result = await launchScanner({
      quality: 0.8,
      includeBase64: false,
      includeExif: false,
    });

    const image: ImageObject | undefined = result?.images?.[0];
    if (!image) return null;

    if (typeof image === "string") {
      return {
        uri: image,
        fileName: DEFAULT_FILE_NAME,
        mimeType: DEFAULT_MIME_TYPE,
      };
    }

    if (!image.uri) return null;

    return {
      uri: image.uri,
      fileName: image.fileName ?? DEFAULT_FILE_NAME,
      mimeType: image.type ?? DEFAULT_MIME_TYPE,
      fileSize: image.fileSize,
    };
  }
}
