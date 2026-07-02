import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IoniconName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

type ResponseTone = {
  container: string;
  iconBackground: string;
  iconColor: string;
  titleColor: string;
  statusPill: string;
  borderColor: string;
  primaryButton: string;
  icon: IoniconName;
};

const getResponseTone = (status: number): ResponseTone => {
  if (status >= 500) {
    return {
      container: "bg-red-50",
      iconBackground: "bg-red-100",
      iconColor: "#DC2626",
      titleColor: "text-red-900",
      statusPill: "bg-red-100 text-red-700",
      borderColor: "border-red-200",
      primaryButton: "bg-red-600 data-[hover=true]:bg-red-700",
      icon: "alert-circle-outline",
    };
  }

  if (status >= 400) {
    return {
      container: "bg-amber-50",
      iconBackground: "bg-amber-100",
      iconColor: "#D97706",
      titleColor: "text-amber-900",
      statusPill: "bg-amber-100 text-amber-800",
      borderColor: "border-amber-200",
      primaryButton: "bg-amber-600 data-[hover=true]:bg-amber-700",
      icon: "warning-outline",
    };
  }

  return {
    container: "bg-blue-50",
    iconBackground: "bg-blue-100",
    iconColor: "#1D4ED8",
    titleColor: "text-blue-900",
    statusPill: "bg-blue-100 text-blue-700",
    borderColor: "border-blue-200",
    primaryButton: "bg-[#1E40AF] data-[hover=true]:bg-[#1D4ED8]",
    icon: "checkmark-done-outline",
  };
};

export function CaptureUploadResponseModal() {
  const {
    responseModalVisible,
    submissionResponse,
    closeResponseModal,
    setBillingModalVisible,
  } = useCaptureContext();

  const response = submissionResponse;

  if (!response) return null;

  const tone = getResponseTone(response.status);
  const title = response.title ?? "Resultado de la solicitud";
  const isAccepted = response.status === 202;

  const handlePrimaryAction = () => {
    closeResponseModal();

    if (!isAccepted) {
      setBillingModalVisible(true);
    }
  };

  return (
    <AlertDialog isOpen={responseModalVisible} onClose={handlePrimaryAction}>
      <AlertDialogBackdrop />
      <AlertDialogContent
        className={`w-[92%] max-w-105 overflow-hidden rounded-3xl px-0 py-0 ${tone.container} ${tone.borderColor}`}>
        <AlertDialogHeader className="px-6 pt-7">
          <VStack space="md" className="w-full">
            <VStack
              className={`h-11 w-11 items-center justify-center rounded-full ${tone.iconBackground}`}>
              <Ionicons name={tone.icon} size={24} color={tone.iconColor} />
            </VStack>

            <Heading size="lg" className={tone.titleColor}>
              {title}
            </Heading>
          </VStack>
        </AlertDialogHeader>

        <AlertDialogBody className="px-6 pb-3">
          <Text className="mt-4 text-sm leading-5 text-slate-700">
            {response.message}
          </Text>
        </AlertDialogBody>

        <AlertDialogFooter className="flex-col gap-4 px-6 pb-7">
          {!isAccepted ? (
            <Button
              className="w-full flex-row items-center justify-center gap-2 bg-white data-[hover=true]:bg-slate-50"
              onPress={handlePrimaryAction}>
              <Ionicons name="refresh-outline" size={20} color="#1E40AF" />
              <ButtonText className="text-[#1E40AF]">Reintentar</ButtonText>
            </Button>
          ) : null}

          <Button
            className={`w-full flex-row items-center justify-center gap-2 ${tone.primaryButton}`}
            onPress={closeResponseModal}>
            <Ionicons name="close-outline" size={20} color="#ffffff" />
            <ButtonText className="text-white">Cerrar</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
