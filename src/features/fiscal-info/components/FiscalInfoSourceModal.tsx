import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

type IoniconName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

interface SourceOptionProps {
  icon: IoniconName;
  title: string;
  description: string;
  onPress: () => void;
  isDisabled?: boolean;
}

function SourceOption({
  icon,
  title,
  description,
  onPress,
  isDisabled,
}: SourceOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className="w-full flex-row items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 data-[hover=true]:bg-slate-50 data-[disabled=true]:opacity-50">
      <View className="h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E0F2FE]">
        <Ionicons name={icon} size={24} color="#38BDF8" />
      </View>

      <View className="flex-1">
        <Text className="text-base font-semibold text-slate-800">{title}</Text>
        <Text className="mt-0.5 text-sm text-slate-500">{description}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </Pressable>
  );
}

interface Props {
  visible: boolean;
  onClose?: () => void;
  onSelectScan: () => void;
  onSelectFile: () => void;
  onSelectManual: () => void;
  isCapturing?: boolean;
  error?: string | null;
}

export function FiscalInfoSourceModal({
  visible,
  onClose,
  onSelectScan,
  onSelectFile,
  onSelectManual,
  isCapturing = false,
  error,
}: Props) {
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent className="w-[92%] max-w-[440px] rounded-3xl bg-white p-0">
        <ModalHeader className="px-6 pt-6">
          <VStack className="w-full gap-2">
            <HStack className="w-full flex-row items-center justify-between">
              <Heading size="lg" className="text-slate-900">
                Añadir datos fiscales
              </Heading>
              {onClose ? (
                <Pressable onPress={onClose} hitSlop={8}>
                  <Ionicons name="close" size={22} color="#64748B" />
                </Pressable>
              ) : null}
            </HStack>
            <Text className="text-sm leading-5 text-slate-500">
              Selecciona el método para registrar tus datos ante el SAT
            </Text>
          </VStack>
        </ModalHeader>

        <ModalBody className="mb-0 mt-0 px-6 pb-6 pt-5">
          <VStack className="w-full gap-3">
            <SourceOption
              icon="scan-outline"
              title="Escanear Constancia"
              description="Captura tu documento con la cámara"
              onPress={onSelectScan}
              isDisabled={isCapturing}
            />
            <SourceOption
              icon="cloud-upload-outline"
              title="Cargar archivo"
              description="Adjunta un PDF o imagen desde tu dispositivo"
              onPress={onSelectFile}
              isDisabled={isCapturing}
            />
            <SourceOption
              icon="create-outline"
              title="Registro manual"
              description="Escribe tu información paso a paso"
              onPress={onSelectManual}
              isDisabled={isCapturing}
            />

            {isCapturing ? (
              <HStack className="mt-1 w-full flex-row items-center justify-center gap-2">
                <ActivityIndicator size="small" color="#1E40AF" />
                <Text className="text-sm text-slate-500">
                  Abriendo captura...
                </Text>
              </HStack>
            ) : null}

            {error ? (
              <Text className="mt-1 text-sm text-rose-600">{error}</Text>
            ) : null}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
