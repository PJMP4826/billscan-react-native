import { createContext, useContext, useState, ReactNode } from "react";
import { Platform } from "react-native";
import { useCapture } from "@/src/features/capture/application/useCapture";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/CapturedImage";
import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/CaptureWebSource";
import { useReceiptSubmit } from "@/src/hooks/useReceiptSubmit";

interface CaptureContextValue {
  images: CapturedImage[];
  isCapturing: boolean;
  isSubmitting: boolean;
  error: CaptureImageError | null;
  webModalVisible: boolean;
  triggerCapture: () => void;
  captureFromWeb: (source: CaptureWebSource) => Promise<void>;
  setWebModalVisible: (v: boolean) => void;
  reset: () => void;
  submit: () => Promise<void>;
}
const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const { images, isCapturing, error, capture, reset } = useCapture();
  const [webModalVisible, setWebModalVisible] = useState(false);

  const { submit: uploadImages, isSubmitting } = useReceiptSubmit();

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

  const submit = async () => {
    await uploadImages(images);
    reset();
  };

  return (
    <CaptureContext.Provider
      value={{
        images,
        isCapturing,
        isSubmitting,
        error,
        webModalVisible,
        triggerCapture,
        captureFromWeb,
        setWebModalVisible,
        reset,
        submit,
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
