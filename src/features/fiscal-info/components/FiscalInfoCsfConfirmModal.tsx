import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
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
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import type { CsfFile } from "@/src/features/fiscal-info/domain/value_objects/csf-file.value_object";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { z } from "zod";

import InvoiceUseDropDown from "@/src/features/fiscal-info/components/InvoiceUseDropDown";

const emailSchema = z.email("Email inválido");

const formatFileSize = (size?: number): string | null => {
  if (!size || size <= 0) return null;
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

interface Props {
  visible: boolean;
  file: CsfFile | null;
  initialEmail?: string;
  initialUseCfdiCodeDefault?: InvoiceUse;
  onSubmit: (data: {
    email: string;
    useCfdiCodeDefault: InvoiceUse;
  }) => void;
  onBack: () => void;
  isSubmitting: boolean;
  error?: string | null;
}

export function FiscalInfoCsfConfirmModal({
  visible,
  file,
  initialEmail = "",
  initialUseCfdiCodeDefault = InvoiceUse.G03,
  onSubmit,
  onBack,
  isSubmitting,
  error,
}: Props) {
  const [email, setEmail] = useState(initialEmail);
  const [useCfdiCodeDefault, setUseCfdiCodeDefault] = useState<InvoiceUse>(
    initialUseCfdiCodeDefault,
  );
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;
    setEmail(initialEmail);
    setUseCfdiCodeDefault(initialUseCfdiCodeDefault);
    setEmailError(null);
  }, [visible, file?.uri, initialEmail, initialUseCfdiCodeDefault]);

  const isOpen = visible && !!file;
  const isImage = file?.mimeType.startsWith("image/") ?? false;
  const fileSize = file ? formatFileSize(file.fileSize) : null;

  const handleSubmit = () => {
    const parsed = emailSchema.safeParse(email.trim());

    if (!parsed.success) {
      setEmailError("Email inválido");
      return;
    }

    setEmailError(null);
    onSubmit({ email: parsed.data, useCfdiCodeDefault });
  };

  return (
    <Modal isOpen={isOpen} onClose={isSubmitting ? undefined : onBack}>
      <ModalBackdrop />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}>
        <ModalContent className="w-full max-w-[440px] rounded-3xl bg-white">
          <ModalHeader>
            <VStack className="w-full gap-1">
              <Heading size="lg" className="text-slate-900">
                Confirmar constancia
              </Heading>
              <Text className="text-sm leading-5 text-slate-500">
                Revisa el archivo y completa los datos fiscales.
              </Text>
            </VStack>
          </ModalHeader>

          <ModalBody>
            <VStack className="w-full gap-4">
              {file ? (
                isImage ? (
                  <View className="w-full overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      source={{ uri: file.uri }}
                      style={{ width: "100%", height: 160 }}
                      resizeMode="contain"
                    />
                  </View>
                ) : (
                  <HStack className="w-full flex-row items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#EFF6FF]">
                      <Ionicons
                        name="document-text-outline"
                        size={22}
                        color="#1D4ED8"
                      />
                    </View>
                    <View className="flex-1">
                      <Text
                        className="text-sm font-semibold text-slate-700"
                        numberOfLines={1}>
                        {file.fileName}
                      </Text>
                      {fileSize ? (
                        <Text className="text-xs text-slate-400">
                          {fileSize}
                        </Text>
                      ) : null}
                    </View>
                  </HStack>
                )
              ) : null}

              {file && isImage && (file.fileName || fileSize) ? (
                <Text className="text-sm text-slate-500" numberOfLines={1}>
                  {[file.fileName, fileSize].filter(Boolean).join(" · ")}
                </Text>
              ) : null}

              <FormControl isInvalid={!!emailError}>
                <FormControlLabel>
                  <FormControlLabelText>Email fiscal</FormControlLabelText>
                  <Text style={{ color: "#ef4444" }}> *</Text>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                      if (emailError) setEmailError(null);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="contacto@empresa.mx"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorText>{emailError}</FormControlErrorText>
                </FormControlError>
              </FormControl>

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>
                    Uso de CFDI por defecto
                  </FormControlLabelText>
                  <Text style={{ color: "#ef4444" }}> *</Text>
                </FormControlLabel>
                <InvoiceUseDropDown
                  selectedValue={useCfdiCodeDefault}
                  onValueChange={(value) =>
                    setUseCfdiCodeDefault(value as InvoiceUse)
                  }
                />
              </FormControl>

              {error ? (
                <Text className="text-sm text-rose-600">{error}</Text>
              ) : null}
            </VStack>
          </ModalBody>

          <ModalFooter className="gap-3">
            <Button
              variant="outline"
              onPress={onBack}
              isDisabled={isSubmitting}
              className="flex-1">
              <ButtonText className="text-[#1E40AF]">Volver</ButtonText>
            </Button>
            <Button
              onPress={handleSubmit}
              isDisabled={isSubmitting}
              className="flex-1">
              <ButtonText>
                {isSubmitting ? "Registrando..." : "Registrar constancia"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </KeyboardAvoidingView>
    </Modal>
  );
}
