import { useFiscalInfoCsf } from "@/src/features/fiscal-info/application/useFiscalInfoCsf";
import { FiscalInfoCsfConfirmModal } from "@/src/features/fiscal-info/components/FiscalInfoCsfConfirmModal";
import { FiscalInfoSetupModal } from "@/src/features/fiscal-info/components/FiscalInfoSetupModal";
import { FiscalInfoSourceModal } from "@/src/features/fiscal-info/components/FiscalInfoSourceModal";
import { CsfCaptureSource } from "@/src/features/fiscal-info/domain/enums/csf-capture-source.enum";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { FiscalInfoPayload } from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { useAppToast } from "@/src/shared/components/AppToast";
import { getApiErrorMessage } from "@/src/shared/infrastructure/adapters/http-client";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

type FiscalInfoCaptureStep = "source" | "manual" | "confirm" | "capturing";

// Espera a que el modal termine de cerrarse antes de abrir otra Activity
// (scanner ML Kit / document picker). Evita problemas de ciclo de vida.
const waitForModalDismiss = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, Platform.OS === "web" ? 0 : 300);
  });

interface Props {
  visible: boolean;
  mode?: "setup" | "update";
  initialValues?: Partial<FiscalInfoPayload>;
  onManualSubmit: (data: FiscalInfoPayload) => void;
  isManualSubmitting: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}

export function FiscalInfoCaptureFlow({
  visible,
  mode = "setup",
  initialValues,
  onManualSubmit,
  isManualSubmitting,
  onClose,
  onSuccess,
}: Props) {
  const [step, setStep] = useState<FiscalInfoCaptureStep>("source");
  const [hasCompleted, setHasCompleted] = useState(false);
  const [pendingSuccessToast, setPendingSuccessToast] = useState<{
    title: string;
    description?: string;
  } | null>(null);
  const appToast = useAppToast();

  const {
    file,
    isCapturing,
    captureError,
    capture,
    submit,
    isSubmitting,
    submitError,
    reset,
  } = useFiscalInfoCsf();

  const resetRef = useRef(reset);
  resetRef.current = reset;

  // Al abrir el flujo siempre se inicia en el selector de método.
  useEffect(() => {
    if (!visible) return;
    setStep("source");
    setHasCompleted(false);
    setPendingSuccessToast(null);
    resetRef.current();
  }, [visible]);

  // El toast de éxito se muestra cuando el modal de confirmación ya terminó
  // de cerrarse para que no compita visualmente con la animación.
  useEffect(() => {
    if (!pendingSuccessToast || !hasCompleted) return;

    const timeout = setTimeout(
      () => {
        appToast.showSuccess(
          pendingSuccessToast.title,
          pendingSuccessToast.description,
        );
        setPendingSuccessToast(null);
      },
      Platform.OS === "web" ? 0 : 300,
    );

    return () => clearTimeout(timeout);
  }, [pendingSuccessToast, hasCompleted]);

  const runCapture = async (source: CsfCaptureSource) => {
    // Se oculta el modal antes de abrir la Activity nativa.
    setStep("capturing");
    await waitForModalDismiss();

    const captured = await capture(source);
    setStep(captured ? "confirm" : "source");
  };

  const handleScan = () => runCapture(CsfCaptureSource.SCAN);

  const handleFile = () => runCapture(CsfCaptureSource.FILE);

  const handleManual = () => {
    reset();
    setStep("manual");
  };

  const handleBackToSource = () => {
    reset();
    setStep("source");
  };

  const handleCsfSubmit = async (data: {
    email: string;
    useCfdiCodeDefault: InvoiceUse;
  }) => {
    try {
      const response = await submit(data);

      setPendingSuccessToast({
        title: "Datos fiscales registrados",
        description: response.message,
      });

      // El POST ya confirmó el registro: se cierra el flujo de inmediato.
      setHasCompleted(true);
      onSuccess?.();
    } catch (error) {
      // En error se mantiene el modal abierto para permitir reintentar.
      appToast.showError(
        "No se pudo registrar la constancia",
        getApiErrorMessage(error, "Intenta nuevamente."),
      );
    }
  };

  const closeable = mode === "update" ? onClose : undefined;

  return (
    <>
      <FiscalInfoSourceModal
        visible={visible && !hasCompleted && step === "source"}
        onClose={closeable}
        onSelectScan={handleScan}
        onSelectFile={handleFile}
        onSelectManual={handleManual}
        isCapturing={isCapturing}
        error={captureError}
      />

      <FiscalInfoSetupModal
        visible={visible && !hasCompleted && step === "manual"}
        mode={mode}
        initialValues={initialValues}
        onSubmit={onManualSubmit}
        isSubmitting={isManualSubmitting}
        onClose={closeable}
      />

      <FiscalInfoCsfConfirmModal
        visible={visible && !hasCompleted && step === "confirm"}
        file={file}
        initialEmail={initialValues?.email}
        initialUseCfdiCodeDefault={
          initialValues?.use_cfdi_code_default ?? InvoiceUse.G03
        }
        onSubmit={handleCsfSubmit}
        onBack={handleBackToSource}
        isSubmitting={isSubmitting}
        error={submitError}
      />
    </>
  );
}
