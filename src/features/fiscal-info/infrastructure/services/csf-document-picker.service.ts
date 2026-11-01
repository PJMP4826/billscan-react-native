import { InvalidCsfFileError } from "@/src/features/fiscal-info/domain/errors/invalid-csf-file.error";
import type { CsfFileCapturePort } from "@/src/features/fiscal-info/domain/ports/csf-file-capture.port";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";
import * as DocumentPicker from "expo-document-picker";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
] as const;

const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
};

const DEFAULT_FILE_NAME = "constancia-fiscal.pdf";

const getExtension = (fileName: string): string => {
  const parts = fileName.toLowerCase().split(".");
  return parts.length > 1 ? parts[parts.length - 1] : "";
};

const resolveMimeType = (fileName: string, mimeType?: string): string => {
  if (
    mimeType &&
    (ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)
  ) {
    return mimeType;
  }

  return MIME_BY_EXTENSION[getExtension(fileName)] ?? mimeType ?? "";
};

const isAllowedFile = (fileName: string, mimeType?: string): boolean => {
  const extension = getExtension(fileName);
  if (MIME_BY_EXTENSION[extension]) return true;

  return (
    !!mimeType && (ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)
  );
};

export class CsfDocumentPickerService implements CsfFileCapturePort {
  async capture(): Promise<CsfFile | null> {
    const result = await DocumentPicker.getDocumentAsync({
      type: [...ALLOWED_MIME_TYPES],
      copyToCacheDirectory: true,
      multiple: false,
      base64: false,
    });

    if (result.canceled) return null;

    const asset = result.assets?.[0];
    if (!asset) return null;

    const fileName = asset.name || DEFAULT_FILE_NAME;

    if (!isAllowedFile(fileName, asset.mimeType)) {
      throw new InvalidCsfFileError(
        "Solo se permiten archivos PDF, JPG o PNG",
      );
    }

    return {
      uri: asset.uri,
      fileName,
      mimeType: resolveMimeType(fileName, asset.mimeType),
      fileSize: asset.size,
    };
  }
}
