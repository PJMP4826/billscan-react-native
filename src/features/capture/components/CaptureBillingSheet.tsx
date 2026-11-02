import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetScrollView,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import type { RegimenFiscalDto } from "@/src/features/fiscal-info/application/dtos/regimen-fiscal.dto";
import {
  InvoiceUse,
  getInvoiceUseDescription,
} from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { TaxRegime } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
import {
  useFiscalInfoQuery,
  useFiscalRegimensQuery,
} from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import { getApiErrorMessage } from "@/src/shared/infrastructure/adapters/http-client";

type SheetStep = "form" | "invoiceUse" | "regimen";

interface CaptureBillingSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface InvoiceUseOption {
  value: InvoiceUse;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onPress: () => void;
  isDisabled?: boolean;
}

const invoiceUseOptions: InvoiceUseOption[] = Object.values(InvoiceUse).map(
  (value) => ({
    value,
    label: `${value} - ${getInvoiceUseDescription(value)}`,
  }),
);

function SelectField({
  label,
  value,
  onPress,
  isDisabled = false,
}: SelectFieldProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 ${
        isDisabled ? "opacity-50" : ""
      }`}>
      <Text className="text-xs font-normal text-slate-400">{label}</Text>
      <HStack className="w-full flex-row items-center justify-between gap-2">
        <Text
          numberOfLines={2}
          className="flex-1 text-sm font-medium text-slate-700">
          {value}
        </Text>
        <Ionicons name="chevron-forward" size={18} color="#64748B" />
      </HStack>
    </Pressable>
  );
}

function SheetHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <HStack className="w-full flex-row items-center gap-2 pb-2">
      <Pressable onPress={onBack} hitSlop={8}>
        <Ionicons name="arrow-back" size={20} color="#334155" />
      </Pressable>
      <Text className="text-base font-semibold text-slate-900">{title}</Text>
    </HStack>
  );
}

export function CaptureBillingSheet({
  isOpen,
  onClose,
}: CaptureBillingSheetProps) {
  const { submit, isSubmitting } = useCaptureContext();
  const { data: fiscalInfo } = useFiscalInfoQuery();
  const {
    data: regimens,
    isLoading: isLoadingRegimens,
    isError: isRegimensError,
    refetch: refetchRegimens,
  } = useFiscalRegimensQuery();

  const defaultUseCfdi = fiscalInfo?.use_cfdi_default ?? InvoiceUse.G03;
  const defaultRegimen = regimens?.[0]?.code ?? null;

  const [step, setStep] = React.useState<SheetStep>("form");
  const [useCfdi, setUseCfdi] = React.useState<InvoiceUse>(defaultUseCfdi);
  const [regimen, setRegimen] = React.useState<TaxRegime | null>(
    defaultRegimen,
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isOpen) return;
    setStep("form");
    setUseCfdi(defaultUseCfdi);
    setSubmitError(null);
  }, [isOpen, defaultUseCfdi]);

  React.useEffect(() => {
    if (!isOpen) return;
    setRegimen(defaultRegimen);
  }, [isOpen, defaultRegimen]);

  const selectedRegimen =
    regimens?.find((item) => item.code === regimen) ?? null;

  const regimenLabel = selectedRegimen
    ? `${selectedRegimen.code} - ${selectedRegimen.description}`
    : isLoadingRegimens
      ? "Cargando regímenes..."
      : isRegimensError
        ? "No fue posible cargar los regímenes"
        : "Selecciona un régimen fiscal";

  const canSubmit = !!regimen && !isSubmitting;

  const handleSubmit = async () => {
    if (!regimen) return;

    setSubmitError(null);

    try {
      await submit(true, { usoCfdi: useCfdi, regimen });
      onClose();
    } catch (error) {
      setSubmitError(
        getApiErrorMessage(
          error,
          "No fue posible enviar los tickets para facturar.",
        ),
      );
    }
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent className="max-h-[85%]">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        {step === "form" ? (
          <ActionsheetScrollView
            className="w-full"
            contentContainerStyle={{ paddingBottom: 24 }}>
            <VStack className="w-full gap-4 pt-2">
              <VStack className="w-full gap-1">
                <Text className="text-lg font-semibold text-slate-900">
                  Datos de facturación
                </Text>
                <Text className="text-sm leading-5 text-slate-500">
                  Elige el uso de CFDI y el régimen fiscal con el que quieres
                  facturar.
                </Text>
              </VStack>

              <SelectField
                label="Uso de CFDI"
                value={`${useCfdi} - ${getInvoiceUseDescription(useCfdi)}`}
                onPress={() => setStep("invoiceUse")}
              />

              <SelectField
                label="Régimen fiscal"
                value={regimenLabel}
                onPress={() => setStep("regimen")}
                isDisabled={isLoadingRegimens || isRegimensError}
              />

              {isRegimensError ? (
                <Button
                  variant="outline"
                  onPress={() => void refetchRegimens()}
                  className="h-auto w-full rounded-2xl px-4 py-2">
                  <ButtonText className="text-[#1E40AF]">
                    Reintentar regímenes
                  </ButtonText>
                </Button>
              ) : null}

              {submitError ? (
                <Text className="text-sm text-rose-600">{submitError}</Text>
              ) : null}

              <Button
                onPress={handleSubmit}
                isDisabled={!canSubmit}
                className="h-auto w-full flex-row items-center justify-center gap-2 rounded-2xl bg-[#1E40AF] px-4 py-3 data-[hover=true]:bg-[#1D4ED8]">
                <Ionicons name="receipt-outline" size={20} color="#ffffff" />
                <ButtonText className="text-sm font-semibold text-white">
                  {isSubmitting ? "Facturando..." : "Facturar"}
                </ButtonText>
              </Button>
            </VStack>
          </ActionsheetScrollView>
        ) : null}

        {step === "invoiceUse" ? (
          <VStack className="w-full gap-2 pt-2">
            <SheetHeader
              title="Uso de CFDI"
              onBack={() => setStep("form")}
            />

            <ActionsheetScrollView
              className="w-full"
              contentContainerStyle={{ paddingBottom: 24 }}>
              {invoiceUseOptions.map((option) => {
                const isSelected = option.value === useCfdi;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => {
                      setUseCfdi(option.value);
                      setStep("form");
                    }}
                    className="w-full flex-row items-center gap-3 border-b border-slate-100 py-3">
                    <Text
                      className={`flex-1 text-sm ${
                        isSelected
                          ? "font-semibold text-slate-900"
                          : "text-slate-600"
                      }`}>
                      {option.label}
                    </Text>
                    {isSelected ? (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#1E40AF"
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </ActionsheetScrollView>
          </VStack>
        ) : null}

        {step === "regimen" ? (
          <VStack className="w-full gap-2 pt-2">
            <SheetHeader
              title="Régimen fiscal"
              onBack={() => setStep("form")}
            />

            {isLoadingRegimens ? (
              <VStack className="w-full items-center gap-2 py-8">
                <ActivityIndicator color="#1E40AF" />
                <Text className="text-sm text-slate-500">
                  Cargando regímenes fiscales...
                </Text>
              </VStack>
            ) : null}

            {!isLoadingRegimens && isRegimensError ? (
              <VStack className="w-full items-center gap-3 py-8">
                <Ionicons
                  name="alert-circle-outline"
                  size={28}
                  color="#e11d48"
                />
                <Text className="text-center text-sm text-rose-600">
                  No fue posible cargar los regímenes fiscales.
                </Text>
                <Button
                  onPress={() => void refetchRegimens()}
                  className="h-auto rounded-full bg-[#1E40AF] px-4 py-2">
                  <ButtonText className="text-xs font-semibold text-white">
                    Reintentar
                  </ButtonText>
                </Button>
              </VStack>
            ) : null}

            {!isLoadingRegimens && !isRegimensError ? (
              <ActionsheetFlatList
                data={regimens ?? []}
                keyExtractor={(item: RegimenFiscalDto) => item.code}
                className="w-full"
                contentContainerStyle={{ paddingBottom: 24 }}
                ListEmptyComponent={
                  <Text className="py-6 text-center text-sm text-slate-500">
                    No hay regímenes fiscales disponibles.
                  </Text>
                }
                renderItem={({ item }: { item: RegimenFiscalDto }) => {
                  const isSelected = item.code === regimen;

                  return (
                    <Pressable
                      onPress={() => {
                        setRegimen(item.code);
                        setStep("form");
                      }}
                      className="w-full flex-row items-center gap-3 border-b border-slate-100 py-3">
                      <Text
                        className={`flex-1 text-sm ${
                          isSelected
                            ? "font-semibold text-slate-900"
                            : "text-slate-600"
                        }`}>
                        {`${item.code} - ${item.description}`}
                      </Text>
                      {isSelected ? (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          color="#1E40AF"
                        />
                      ) : null}
                    </Pressable>
                  );
                }}
              />
            ) : null}
          </VStack>
        ) : null}
      </ActionsheetContent>
    </Actionsheet>
  );
}
