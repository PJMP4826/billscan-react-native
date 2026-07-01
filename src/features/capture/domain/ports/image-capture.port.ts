import { CapturedImage } from "../value_objects/captured-image.value_object";

export interface ImageCapturePort {
  capture(): Promise<CapturedImage[]>;
}
