import { ImageCapturePort } from "../../domain/ports/image-capture.port";
import { CapturedImage } from "../../domain/value_objects/captured-image.value_object";

import {
  ImageObject,
  launchScanner,
} from "@dariyd/react-native-document-scanner";

export class NativeScannerService implements ImageCapturePort {
  async capture(): Promise<CapturedImage[]> {
    const result = await launchScanner({
      quality: 0.8,
      includeBase64: false,
      includeExif: true,
    });

    if (!result?.images?.length) return [];

    return result.images.map((img: ImageObject) => ({
      uri: typeof img === "string" ? img : img.uri,
      width: img.width ?? 0,
      height: img.height ?? 0,
      mimeType: img.type ?? "image/jpeg",
      fileName: img.fileName ?? "scan.jpg",
      fileSize: img.fileSize,
      exif: img.exif,
    }));
  }
}
