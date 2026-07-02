import { useCapture } from "@/src/features/capture/application/useCapture";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/capture-web-source.enum";
import { type ReceiptUploadResponse } from "@/src/features/capture/domain/records/receipt-upload-response.record";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { useReceiptSubmit } from "@/src/features/capture/infrastructure/hooks/useReceiptSubmit";
import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Platform } from "react-native";

interface CaptureContextValue {
  images: CapturedImage[];
  isCapturing: boolean;
  isSubmitting: boolean;
  error: CaptureImageError | null;
  webModalVisible: boolean;
  billingModalVisible: boolean;
  responseModalVisible: boolean;
  submissionResponse: ReceiptUploadResponse | null;
  triggerCapture: () => Promise<void>;
  captureFromWeb: (source: CaptureWebSource) => Promise<void>;
  setWebModalVisible: (v: boolean) => void;
  setBillingModalVisible: (v: boolean) => void;
  closeResponseModal: () => void;
  reset: () => void;
  openBillingOptions: () => void;
  submit: (autoBilling: boolean) => Promise<void>;
}
const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const { images, isCapturing, error, capture, reset } = useCapture();
  const [webModalVisible, setWebModalVisible] = useState(false);
  const [billingModalVisible, setBillingModalVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [submissionResponse, setSubmissionResponse] =
    useState<ReceiptUploadResponse | null>(null);

  const { submit: uploadImages, isSubmitting } = useReceiptSubmit();

  const openBillingOptions = () => {
    if (images.length === 0) return;
    setBillingModalVisible(true);
  };

  const closeResponseModal = () => {
    setResponseModalVisible(false);
    setSubmissionResponse(null);
  };

  const triggerCapture = async () => {
    if (Platform.OS === "android") {
      const capturedImages = await capture();
      if (capturedImages.length > 0) {
        setBillingModalVisible(true);
      }
    } else {
      setWebModalVisible(true);
    }
  };

  const captureFromWeb = async (source: CaptureWebSource) => {
    setWebModalVisible(false);
    const capturedImages = await capture(source);
    if (capturedImages.length > 0) {
      setBillingModalVisible(true);
    }
  };

  const submit = async (autoBilling: boolean) => {
    const response = await uploadImages({ images, autoBilling });
    setBillingModalVisible(false);
    setSubmissionResponse(response);
    setResponseModalVisible(true);

    if (response.status === 202) {
      reset();
    }
  };

  return (
    <CaptureContext.Provider
      value={{
        images,
        isCapturing,
        isSubmitting,
        error,
        webModalVisible,
        billingModalVisible,
        responseModalVisible,
        submissionResponse,
        triggerCapture,
        captureFromWeb,
        setWebModalVisible,
        setBillingModalVisible,
        closeResponseModal,
        reset,
        openBillingOptions,
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
