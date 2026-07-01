import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { useState } from "react";
import { CaptureWebSource } from "../domain/enums/capture-web-source.enum";
import { CapturedImage } from "../domain/value_objects/captured-image.value_object";
import { createCaptureService } from "../infrastructure/factories/CaptureServiceFactory";

interface UseCaptureReturn {
  images: CapturedImage[];
  isCapturing: boolean;
  error: CaptureImageError | null;
  capture: (webSource?: CaptureWebSource) => Promise<void>;
  reset: () => void;
}

export function useCapture(): UseCaptureReturn {
  const [images, setImages] = useState<CapturedImage[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<CaptureImageError | null>(null);

  const capture = async (webSource?: CaptureWebSource) => {
    try {
      setIsCapturing(true);
      setError(null);
      const service = createCaptureService(webSource);
      const result = await service.capture();
      setImages(result);
    } catch (err) {
      setError(new CaptureImageError("Error getting images"));
    } finally {
      setIsCapturing(false);
    }
  };

  const reset = () => {
    setImages([]);
    setError(null);
  };

  return { images, isCapturing, error, capture, reset };
}
