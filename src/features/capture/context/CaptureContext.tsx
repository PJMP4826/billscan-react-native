import { useCapture } from "@/src/features/capture/application/useCapture";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/capture-web-source.enum";
import { type ReceiptUploadResponse } from "@/src/features/capture/domain/records/receipt-upload-response.record";
import { CapturedImage } from "@/src/features/capture/domain/value_objects/captured-image.value_object";
import { useReceiptSubmit } from "@/src/features/capture/infrastructure/hooks/useReceiptSubmit";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
import {
  useFiscalInfoQuery,
  useFiscalRegimensQuery,
} from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import { CaptureImageError } from "@/src/shared/errors/CaptureImageError";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Platform } from "react-native";

interface BillingSelection {
  usoCfdi: InvoiceUse;
  regimen: TaxRegime;
}

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
  submit: (autoBilling: boolean, selection?: BillingSelection) => Promise<void>;
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
  const { data: fiscalInfo } = useFiscalInfoQuery();
  const { data: regimens } = useFiscalRegimensQuery();

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

  const submit = async (autoBilling: boolean, selection?: BillingSelection) => {
    const usoCfdi =
      selection?.usoCfdi ?? fiscalInfo?.use_cfdi_default ?? InvoiceUse.G03;
    const regimen =
      selection?.regimen ?? regimens?.[0]?.code ?? TaxRegime.R601;

    const response = await uploadImages({
      images,
      autoBilling,
      usoCfdi,
      regimen,
    });
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
