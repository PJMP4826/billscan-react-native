import { CapturedImage } from "../value_objects/CapturedImage";

export interface ImageCapturePort {
  capture(): Promise<CapturedImage[]>;
}