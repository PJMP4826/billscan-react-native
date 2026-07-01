import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@/components/ui/modal";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import {
  FiscalInfoPayload,
  fiscalInfoSchema,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import RegimenFiscalDropDown from "@/src/features/fiscal-info/components/RegimenFiscalDropDown";
import InvoiceUseDropDown from "@/src/features/fiscal-info/components/InvoiceUseDropDown";

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
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{
                paddingBottom: 32,
              }}>
              {/* RFC */}
              <Controller
                control={control}
                name="rfc"
                render={({ field: { onChange, value } }) => (
                  <FormControl isInvalid={!!errors.rfc} className="mb-4">
                    <FormControlLabel>
                      <FormControlLabelText>RFC</FormControlLabelText>
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
                  <FormControl
                    isInvalid={!!errors.razon_social}
                    className="mb-4">
                    <FormControlLabel>
                      <FormControlLabelText>Razón Social</FormControlLabelText>
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

              {/* Régimen Fiscal */}
              <Controller
                control={control}
                name="regimen_code"
                render={({ field: { onChange, value } }) => (
                  <FormControl
                    isInvalid={!!errors.regimen_code}
                    className="mb-4">
                    <FormControlLabel>
                      <FormControlLabelText>
                        Régimen Fiscal
                      </FormControlLabelText>
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
                    </FormControlLabel>

                    <InvoiceUseDropDown
                      selectedValue={value}
                      onValueChange={onChange}
                    />
                  </FormControl>
                )}
              />
            </ScrollView>
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
