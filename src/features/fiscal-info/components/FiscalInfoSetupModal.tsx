import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FiscalInfoPayload,
  fiscalInfoSchema,
} from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { InvoiceUse } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";

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
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl p-6">
          <Text className="text-xl font-bold mb-4">
            Configura tu información fiscal
          </Text>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Controller
              control={control}
              name="rfc"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">RFC</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={value}
                    onChangeText={onChange}
                    autoCapitalize="characters"
                    maxLength={13}
                    placeholder="XAXX010101000"
                  />
                  {errors.rfc && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.rfc.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="razon_social"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">
                    Razón Social
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={value}
                    onChangeText={onChange}
                    placeholder="Mi Empresa S.A. de C.V."
                  />
                  {errors.razon_social && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.razon_social.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">
                    Email fiscal
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="contacto@empresa.mx"
                  />
                  {errors.email && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="cp"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">
                    Código Postal
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    maxLength={5}
                    placeholder="86000"
                  />
                  {errors.cp && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.cp.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="regimen_code"
              render={({ field: { onChange, value } }) => (
                <View className="mb-4">
                  <Text className="text-sm text-gray-600 mb-1">
                    Código de Régimen Fiscal
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    placeholder="601"
                  />
                  {errors.regimen_code && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.regimen_code.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <Pressable
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-blue-600 rounded-lg py-3 mt-2">
              <Text className="text-white text-center font-semibold">
                {isSubmitting ? "Guardando..." : "Guardar información fiscal"}
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
