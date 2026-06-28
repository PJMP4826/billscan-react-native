export interface CapturedImage {
  uri: string;
  width: number;
  height: number;
  mimeType: string;
  fileName: string;
  fileSize?: number;
  base64?: string;
  exif?: Record<string, any>;
}
