import { CaptureWebSource } from "@/src/features/capture/domain/enums/capture-web-source.enum";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { createCaptureService } from "@/src/features/capture/infrastructure/factories/capture-service.factory";
import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { useState } from "react";

interface UseCaptureReturn {
  images: CapturedImage[];
  isCapturing: boolean;
  error: CaptureImageError | null;
  capture: (webSource?: CaptureWebSource) => Promise<CapturedImage[]>;
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
      return result;
    } catch (err) {
      setError(new CaptureImageError("Error getting images"));
      return [];
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
