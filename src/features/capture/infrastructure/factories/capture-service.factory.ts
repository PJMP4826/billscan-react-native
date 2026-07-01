import { Platform } from "react-native";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/capture-web-source.enum";
import { ImageCapturePort } from "@/src/features/capture/domain/ports/image-capture.port";
import { ImagePickerService } from "@/src/features/capture/infrastructure/services/image-picker.service";
import { NativeScannerService } from "@/src/features/capture/infrastructure/services/native-scanner.service";

export function createCaptureService(
  webSource?: CaptureWebSource,
): ImageCapturePort {
  if (Platform.OS === "android") {
    return new NativeScannerService();
  }
  return new ImagePickerService(webSource ?? CaptureWebSource.LIBRARY);
}
