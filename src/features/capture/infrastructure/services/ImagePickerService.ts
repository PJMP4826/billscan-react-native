import * as ImagePicker from "expo-image-picker";
import { CaptureWebSource } from "../../domain/enums/CaptureWebSource";
import { PermissionDeniedError } from "../../../../shared/errors/PermissionDeniedError";
import { ImageCapturePort } from "../../domain/ports/ImageCapturePort";
import { CapturedImage } from "../../domain/value_objects/CapturedImage";

export class ImagePickerService implements ImageCapturePort {
  private readonly source: CaptureWebSource;

  constructor(source: CaptureWebSource = CaptureWebSource.LIBRARY) {
    this.source = source;
  }

  async capture(): Promise<CapturedImage[]> {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      throw new PermissionDeniedError(
        "Se requiere permiso para acceder al almacenamiento.",
      );
    }

    const result =
      this.source === CaptureWebSource.CAMERA
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            quality: 0.8,
            allowsMultipleSelection: true,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 0.8,
            allowsMultipleSelection: true,
          });

    if (result.canceled) return [];

    return result.assets.map((asset) => ({
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      mimeType: asset.mimeType ?? "image/jpeg",
      fileName: asset.fileName ?? "image.jpg",
      fileSize: asset.fileSize,
      base64: asset.base64 ?? undefined,
      exif: asset.exif ?? undefined,
    }));
  }
}
