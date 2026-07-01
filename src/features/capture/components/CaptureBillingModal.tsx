import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCaptureContext } from "@/src/features/capture/context/CaptureContext";
import { Ionicons } from "@expo/vector-icons";

export function CaptureBillingModal() {
  const {
    billingModalVisible,
    setBillingModalVisible,
    submit,
    images,
    isSubmitting,
  } = useCaptureContext();

  const onClose = () => {
    setBillingModalVisible(false);
  };

  return (
    <Modal isOpen={billingModalVisible} onRequestClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="w-[92%] max-w-105 rounded-3xl px-0 py-0 overflow-hidden">
        <ModalHeader className="px-6 pt-6">
          <VStack space="sm" className="w-full">
            <VStack className="h-11 w-11 items-center justify-center rounded-full bg-blue-100">
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#1E40AF"
              />
            </VStack>
            <Heading size="lg" className="text-gray-900">
              ¿Qué quieres hacer con {images.length} imagen
              {images.length === 1 ? "" : "es"}?
            </Heading>
            <Text className="text-sm leading-5 text-gray-500">
              Elige si solo quieres guardar el escaneo o si también deseas
              facturarlo.
            </Text>
          </VStack>
        </ModalHeader>

        <ModalBody className="px-6 pb-2" />

        <ModalFooter className="flex-col gap-3 px-6 pb-6">
          <Button
            className="w-full flex-row items-center justify-center gap-2 bg-blue-100 data-[hover=true]:bg-[#d2dff1]"
            onPress={() => submit(false)}
            isDisabled={isSubmitting}>
            <Ionicons name="save-outline" size={20} color="#1E40AF" />
            <ButtonText className="text-[#1E40AF]">
              Escanear y guardar
            </ButtonText>
          </Button>

          <Button
            className="w-full flex-row items-center justify-center gap-2 bg-[#1E40AF] data-[hover=true]:bg-[#1D4ED8]"
            onPress={() => submit(true)}
            isDisabled={isSubmitting}>
            <Ionicons name="receipt-outline" size={20} color="#ffffff" />
            <ButtonText className="text-white">Escanear y facturar</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
