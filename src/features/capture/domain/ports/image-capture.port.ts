import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";

export interface ImageCapturePort {
  capture(): Promise<CapturedImage[]>;
}
