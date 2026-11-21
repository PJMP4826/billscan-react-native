import { useCapture } from "@/src/features/capture/application/useCapture";
import { CaptureWebSource } from "@/src/features/capture/domain/enums/capture-web-source.enum";
import {
  ReceiptUploadError,
  mapReceiptUploadError,
} from "@/src/features/capture/domain/errors/receipt-upload.error";
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

interface ReceiptSubmission {
  images: CapturedImage[];
  autoBilling: boolean;
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
  billingSheetVisible: boolean;
  responseModalVisible: boolean;
  errorModalVisible: boolean;
  submissionResponse: ReceiptUploadResponse | null;
  submissionError: ReceiptUploadError | null;
  triggerCapture: () => Promise<void>;
  captureFromWeb: (source: CaptureWebSource) => Promise<void>;
  setWebModalVisible: (v: boolean) => void;
  setBillingModalVisible: (v: boolean) => void;
  setBillingSheetVisible: (v: boolean) => void;
  closeResponseModal: () => void;
  closeErrorModal: () => void;
  retrySubmission: () => Promise<void>;
  recapture: () => Promise<void>;
  reset: () => void;
  openBillingOptions: () => void;
  submit: (autoBilling: boolean, selection?: BillingSelection) => Promise<void>;
}
const CaptureContext = createContext<CaptureContextValue | null>(null);

export function CaptureProvider({ children }: { children: ReactNode }) {
  const { images, isCapturing, error, capture, reset } = useCapture();
  const [webModalVisible, setWebModalVisible] = useState(false);
  const [billingModalVisible, setBillingModalVisible] = useState(false);
  const [billingSheetVisible, setBillingSheetVisible] = useState(false);
  const [responseModalVisible, setResponseModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [submissionResponse, setSubmissionResponse] =
    useState<ReceiptUploadResponse | null>(null);
  const [submissionError, setSubmissionError] =
    useState<ReceiptUploadError | null>(null);
  const [lastSubmission, setLastSubmission] =
    useState<ReceiptSubmission | null>(null);

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

  const closeErrorModal = () => {
    setErrorModalVisible(false);
    setSubmissionError(null);
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

  const performSubmit = async (submission: ReceiptSubmission) => {
    try {
      const response = await uploadImages(submission);
      setBillingModalVisible(false);
      setBillingSheetVisible(false);
      setSubmissionError(null);
      setSubmissionResponse(response);
      setResponseModalVisible(true);

      if (response.status === 202) {
        reset();
      }
    } catch (error) {
      setBillingModalVisible(false);
      setBillingSheetVisible(false);
      setSubmissionError(mapReceiptUploadError(error));
      setErrorModalVisible(true);
    }
  };

  const submit = async (autoBilling: boolean, selection?: BillingSelection) => {
    const usoCfdi =
      selection?.usoCfdi ?? fiscalInfo?.use_cfdi_default ?? InvoiceUse.G03;
    const regimen =
      selection?.regimen ?? regimens?.[0]?.code ?? TaxRegime.R601;

    const submission: ReceiptSubmission = {
      images,
      autoBilling,
      usoCfdi,
      regimen,
    };

    setLastSubmission(submission);
    await performSubmit(submission);
  };

  const retrySubmission = async () => {
    if (!lastSubmission) return;
    setErrorModalVisible(false);
    await performSubmit(lastSubmission);
  };

  const recapture = async () => {
    setErrorModalVisible(false);
    setSubmissionError(null);
    reset();
    await triggerCapture();
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
        billingSheetVisible,
        responseModalVisible,
        errorModalVisible,
        submissionResponse,
        submissionError,
        triggerCapture,
        captureFromWeb,
        setWebModalVisible,
        setBillingModalVisible,
        setBillingSheetVisible,
        closeResponseModal,
        closeErrorModal,
        retrySubmission,
        recapture,
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
