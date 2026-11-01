import { CsfCaptureSource } from "@/src/features/fiscal-info/domain/enums/csf-capture-source.enum";
import type { CsfFileCapturePort } from "@/src/features/fiscal-info/domain/ports/csf-file-capture.port";
import { CsfDocumentPickerService } from "@/src/features/fiscal-info/infrastructure/services/csf-document-picker.service";
import { CsfImagePickerService } from "@/src/features/fiscal-info/infrastructure/services/csf-image-picker.service";
import { CsfNativeScannerService } from "@/src/features/fiscal-info/infrastructure/services/csf-native-scanner.service";
import { Platform } from "react-native";

export function createCsfFileCaptureService(
  source: CsfCaptureSource,
): CsfFileCapturePort {
  if (source === CsfCaptureSource.FILE) {
    return new CsfDocumentPickerService();
  }

  // @dariyd/react-native-document-scanner no soporta web.
  if (Platform.OS === "web") {
    return new CsfImagePickerService();
  }

  return new CsfNativeScannerService();
}
