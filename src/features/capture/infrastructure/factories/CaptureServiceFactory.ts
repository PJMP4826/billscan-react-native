import { Platform } from "react-native";
import { ImageCapturePort } from "../../domain/ports/ImageCapturePort";
import { CaptureWebSource } from "../../domain/enums/CaptureWebSource";
import { NativeScannerService } from "../services/NativeScannerService";
import { ImagePickerService } from "../services/ImagePickerService";


export function createCaptureService(webSource?: CaptureWebSource): ImageCapturePort {
  if (Platform.OS === "android") {
    return new NativeScannerService();
  }
  return new ImagePickerService(webSource ?? CaptureWebSource.LIBRARY);
}