import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
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
import { Text } from "@/components/ui/text";
import { todayIsoDate } from "@/src/features/fiscal-info/application/dates";
import DatePickerField from "@/src/features/fiscal-info/components/DatePickerField";
import InvoiceUseDropDown from "@/src/features/fiscal-info/components/InvoiceUseDropDown";
import RegimenFiscalDropDown from "@/src/features/fiscal-info/components/RegimenFiscalDropDown";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { getTaxRegimeDescription } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
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

type FiscalInfoModalMode = "setup" | "update";

interface Props {
  visible: boolean;
  onSubmit: (data: FiscalInfoPayload) => void;
  isSubmitting: boolean;
  /** `setup` = primer registro, `update` = actualización desde el perfil. */
  mode?: FiscalInfoModalMode;
  /** Valores con los que se precarga el formulario (modo update). */
  initialValues?: Partial<FiscalInfoPayload>;
  /** Si se envía, el modal se puede cerrar sin guardar. */
  onClose?: () => void;
}

const buildDefaultValues = (
  initialValues?: Partial<FiscalInfoPayload>,
): FiscalInfoPayload => ({
  rfc: initialValues?.rfc ?? "",
  razon_social: initialValues?.razon_social ?? "",
  email: initialValues?.email ?? "",
  cp: initialValues?.cp ?? "",
  address: initialValues?.address ?? "",
  regimenes: initialValues?.regimenes ?? [],
  use_cfdi_code_default: initialValues?.use_cfdi_code_default ?? InvoiceUse.G03,
});

export const FiscalInfoSetupModal = ({
  visible,
  onSubmit,
  isSubmitting,
  mode = "setup",
  initialValues,
  onClose,
}: Props) => {
  const { width, height } = useWindowDimensions();
  const isUpdate = mode === "update";

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FiscalInfoPayload>({
    resolver: zodResolver(fiscalInfoSchema),
    defaultValues: buildDefaultValues(initialValues),
  });

  const initialValuesKey = JSON.stringify(initialValues ?? {});

  // Al abrir el modal se refrescan los valores precargados (perfil → actualizar).
  React.useEffect(() => {
    if (!visible) return;
    reset(buildDefaultValues(JSON.parse(initialValuesKey)));
  }, [visible, initialValuesKey, reset]);

  return (
    <Modal isOpen={visible} onClose={onClose}>
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
            maxHeight: height * 0.85, // 85% of screen height
          }}>
          <ModalHeader>
            <Heading size="lg">
              {isUpdate
                ? "Actualiza tu información fiscal"
                : "Configura tu información fiscal"}
            </Heading>
            {onClose ? (
              <Pressable onPress={onClose} hitSlop={8}>
                <Ionicons name="close" size={22} color="#64748B" />
              </Pressable>
            ) : null}
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

            {/* Regímenes fiscales (multi-selección) */}
            <Controller
              control={control}
              name="regimenes"
              render={({ field: { onChange, value } }) => {
                const regimenes = value ?? [];

                const handleValuesChange = (codes: string[]) => {
                  const known = new Map(
                    regimenes.map((item) => [item.code, item.fecha_alta_sat]),
                  );
                  onChange(
                    codes.map((code) => ({
                      code,
                      fecha_alta_sat: known.get(code) || todayIsoDate(),
                    })),
                  );
                };

                return (
                  <FormControl isInvalid={!!errors.regimenes} className="mb-4">
                    <FormControlLabel>
                      <FormControlLabelText>
                        Regímenes fiscales
                      </FormControlLabelText>
                      <Text style={{ color: "#ef4444" }}> *</Text>
                    </FormControlLabel>

                    <RegimenFiscalDropDown
                      selectedValues={regimenes.map((item) => item.code)}
                      onValuesChange={handleValuesChange}
                      isInvalid={!!errors.regimenes}
                    />

                    {regimenes.map((regimen) => (
                      <FormControl
                        key={regimen.code}
                        className="mt-3"
                        isInvalid={
                          !!errors.regimenes?.[
                            regimenes.findIndex(
                              (item) => item.code === regimen.code,
                            )
                          ]?.fecha_alta_sat
                        }>
                        <FormControlLabel>
                          <FormControlLabelText>
                            {`Alta en el SAT · ${regimen.code} - ${getTaxRegimeDescription(
                              regimen.code,
                            )}`}
                          </FormControlLabelText>
                          <Text style={{ color: "#ef4444" }}> *</Text>
                        </FormControlLabel>
                        <DatePickerField
                          value={regimen.fecha_alta_sat}
                          onChange={(fecha) =>
                            onChange(
                              regimenes.map((item) =>
                                item.code === regimen.code
                                  ? { ...item, fecha_alta_sat: fecha }
                                  : item,
                              ),
                            )
                          }
                        />
                        <FormControlError>
                          <FormControlErrorText>
                            {
                              errors.regimenes?.[
                                regimenes.findIndex(
                                  (item) => item.code === regimen.code,
                                )
                              ]?.fecha_alta_sat?.message
                            }
                          </FormControlErrorText>
                        </FormControlError>
                      </FormControl>
                    ))}

                    <FormControlError>
                      <FormControlErrorText>
                        {
                          (errors.regimenes as { message?: string } | undefined)
                            ?.message
                        }
                      </FormControlErrorText>
                    </FormControlError>
                  </FormControl>
                );
              }}
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
            {onClose ? (
              <Button
                variant="outline"
                onPress={onClose}
                isDisabled={isSubmitting}
                className="flex-1">
                <ButtonText className="text-[#1E40AF]">Cancelar</ButtonText>
              </Button>
            ) : null}
            <Button
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting}
              className="flex-1">
              <ButtonText>
                {isSubmitting
                  ? "Guardando..."
                  : isUpdate
                    ? "Actualizar"
                    : "Guardar información fiscal"}
              </ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </KeyboardAvoidingView>
    </Modal>
  );
};
