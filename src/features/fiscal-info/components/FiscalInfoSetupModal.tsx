import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import InvoiceUseDropDown from "@/src/features/fiscal-info/components/InvoiceUseDropDown";
import RegimenFiscalDropDown from "@/src/features/fiscal-info/components/RegimenFiscalDropDown";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import {
  FiscalInfoPayload,
  fiscalInfoSchema,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";

interface Props {
  visible: boolean;
  onSubmit: (data: FiscalInfoPayload) => void;
  isSubmitting: boolean;
}

export const FiscalInfoSetupModal = ({
  visible,
  onSubmit,
  isSubmitting,
}: Props) => {
  const { width, height } = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FiscalInfoPayload>({
    resolver: zodResolver(fiscalInfoSchema),
    defaultValues: {
      rfc: "",
      razon_social: "",
      email: "",
      cp: "",
      address: "",
      regimen_code: "",
      use_cfdi_code_default: InvoiceUse.G03,
    },
  });

  return (
    <Modal isOpen={visible}>
      <ModalBackdrop />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 16,
        }}>
        <ModalContent
          style={{
            width: width - 32, // full screen width minus 16px padding each side
            maxHeight: height * 0.85, // 80% of screen height
          }}>
          <ModalHeader>
            <Heading size="lg">Configura tu información fiscal</Heading>
          </ModalHeader>

          <ModalBody>
            {/* RFC */}
            <Controller
              control={control}
              name="rfc"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.rfc} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>RFC</FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}> *</Text>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={value}
                      onChangeText={onChange}
                      autoCapitalize="characters"
                      maxLength={13}
                      placeholder="XAXX010101000"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.rfc?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />

            {/* Razón Social */}
            <Controller
              control={control}
              name="razon_social"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.razon_social} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>Razón Social</FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}> *</Text>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={value}
                      onChangeText={onChange}
                      placeholder="Mi Empresa S.A. de C.V."
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.razon_social?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.email} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>Email fiscal</FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}> *</Text>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="contacto@empresa.mx"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.email?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />

            {/* CP */}
            <Controller
              control={control}
              name="cp"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.cp} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>Código Postal</FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}>*</Text>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      maxLength={5}
                      placeholder="86000"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.cp?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />

            {/* Address */}
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.address} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>
                      Dirección fiscal
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      value={value ?? ""}
                      onChangeText={onChange}
                      placeholder="Av. Paseo de la Reforma 123, Col. Centro"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      {errors.address?.message}
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              )}
            />

            {/* Régimen Fiscal */}
            <Controller
              control={control}
              name="regimen_code"
              render={({ field: { onChange, value } }) => (
                <FormControl isInvalid={!!errors.regimen_code} className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>Régimen Fiscal</FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}> *</Text>
                  </FormControlLabel>

                  <RegimenFiscalDropDown
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                </FormControl>
              )}
            />

            {/* Uso de Cfdi */}
            <Controller
              control={control}
              name="use_cfdi_code_default"
              render={({ field: { onChange, value } }) => (
                <FormControl
                  isInvalid={!!errors.use_cfdi_code_default}
                  className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText>
                      Uso de CFDI por defecto (para facturar)
                    </FormControlLabelText>
                    <Text style={{ color: "#ef4444" }}> *</Text>
                  </FormControlLabel>

                  <InvoiceUseDropDown
                    selectedValue={value}
                    onValueChange={onChange}
                  />
                </FormControl>
              )}
            />
          </ModalBody>

          <ModalFooter>
            <Button
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
              className="flex-1">
              <ButtonText>
                {isSubmitting ? "Guardando..." : "Guardar información fiscal"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </KeyboardAvoidingView>
    </Modal>
  );
};
