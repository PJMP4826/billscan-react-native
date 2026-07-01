import { Platform } from "react-native";
import { CaptureWebSource } from "../../domain/ports/image-capture.portce.enum";
import { ImageCapturePort } from "../../domain/ports/ImageCapturePort";
import { ImagePickerService } from "../services/ImagePickerService";
import { NativeScannerService } from "../services/NativeScannerService";

export function createCaptureService(
  webSource?: CaptureWebSource,
): ImageCapturePort {
  if (Platform.OS === "android") {
    return new NativeScannerService();
  }
  return new ImagePickerService(webSource ?? CaptureWebSource.LIBRARY);
}
