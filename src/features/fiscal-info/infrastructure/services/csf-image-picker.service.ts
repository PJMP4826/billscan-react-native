import { InvalidCsfFileError } from "@/src/features/fiscal-info/domain/errors/invalid-csf-file.error";
import type { CsfFileCapturePort } from "@/src/features/fiscal-info/domain/ports/csf-file-capture.port";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";
import * as ImagePicker from "expo-image-picker";

const DEFAULT_FILE_NAME = "constancia-fiscal.jpg";
const DEFAULT_MIME_TYPE = "image/jpeg";

export class CsfImagePickerService implements CsfFileCapturePort {
  async capture(): Promise<CsfFile | null> {
    const permissionResult =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      throw new InvalidCsfFileError(
        "Se requiere permiso para usar la cámara.",
      );
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.8,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return null;

    const asset = result.assets?.[0];
    if (!asset) return null;

    return {
      uri: asset.uri,
      fileName: asset.fileName ?? DEFAULT_FILE_NAME,
      mimeType: asset.mimeType ?? DEFAULT_MIME_TYPE,
      fileSize: asset.fileSize,
    };
  }
}
