import { createContext, useContext, useState, ReactNode } from "react";
import { Platform } from "react-native";
import { useCapture } from "@/src/features/capture/application/useCapture";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/CapturedImage";
import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/CaptureWebSource";

interface CaptureContextValue {
  images: CapturedImage[];
  isCapturing: boolean;
  error: CaptureImageError | null;
  webModalVisible: boolean;
  triggerCapture: () => void;
  captureFromWeb: (source: CaptureWebSource) => Promise<void>;
  setWebModalVisible: (v: boolean) => void;
  reset: () => void;
}

const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const { images, isCapturing, error, capture, reset } = useCapture();
  const [webModalVisible, setWebModalVisible] = useState(false);

  const triggerCapture = () => {
    if (Platform.OS === "android") {
      capture();
    } else {
      setWebModalVisible(true);
    }
  };

  const captureFromWeb = async (source: CaptureWebSource) => {
    setWebModalVisible(false);
    await capture(source);
  };

  return (
    <CaptureContext.Provider
      value={{
        images,
        isCapturing,
        error,
        webModalVisible,
        triggerCapture,
        captureFromWeb,
        setWebModalVisible,
        reset,
      }}>
      {children}
    </CaptureContext.Provider>
  );
}

export function useCaptureContext() {
  const ctx = useContext(CaptureContext);
  if (!ctx)
    throw new Error("useCaptureContext must be used within CaptureProvider");
  return ctx;
}
