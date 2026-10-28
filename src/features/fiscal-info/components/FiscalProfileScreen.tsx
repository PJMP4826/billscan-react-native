import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { formatIsoDate, normalizeIsoDate, todayIsoDate } from "@/src/features/fiscal-info/application/dates";
import { useFiscalInfoSetup } from "@/src/features/fiscal-info/application/useFiscalInfoSetup";
import type { RegimenFiscalDto } from "@/src/features/fiscal-info/application/dtos/regimen-fiscal.dto";
import { FiscalInfoSetupModal } from "@/src/features/fiscal-info/components/FiscalInfoSetupModal";
import { getInvoiceUseDescription } from "@/src/features/fiscal-info/domain/enums/invoice-use.enum";
import { getTaxRegimeDescription } from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";
import type { FiscalInfoPayload } from "@/src/features/fiscal-info/infrastructure/schemas/fiscal-info.schema";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface InfoRowProps {
  label: string;
  value: string;
  breakAll?: boolean;
}

function InfoRow({ label, value, breakAll }: InfoRowProps) {
  return (
    <VStack className="w-full gap-1">
      <Text className="text-xs font-normal text-slate-400">{label}</Text>
      <Text
        className={`text-sm font-medium text-slate-700 ${
          breakAll ? "break-all" : ""
        }`}>
        {value}
      </Text>
    </VStack>
  );
}

interface SectionCardProps {
  title: string;
  icon: IoniconName;
  children: React.ReactNode;
}

function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        <HStack className="w-full flex-row items-center gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Ionicons name={icon} size={18} color="#1D4ED8" />
          </View>
          <Heading className="min-w-0 flex-1 text-base font-semibold text-slate-800 sm:text-lg">
            {title}
          </Heading>
        </HStack>
        {children}
      </VStack>
    </Card>
  );
}

function RegimenRow({ regimen }: { regimen: RegimenFiscalDto }) {
  const fechaAlta = formatIsoDate(regimen.fecha_alta);

  return (
    <VStack className="w-full gap-1 rounded-2xl bg-slate-50 p-3">
      <HStack className="w-full flex-row items-center gap-2">
        <View className="rounded-lg bg-[#EFF6FF] px-2 py-0.5">
          <Text className="text-xs font-semibold text-[#1D4ED8]">
            {regimen.code}
          </Text>
        </View>
        <Text className="flex-1 text-sm font-semibold text-slate-800">
          {regimen.description ||
            getTaxRegimeDescription(regimen.code) ||
            "Régimen sin descripción"}
        </Text>
      </HStack>
      {fechaAlta ? (
        <Text className="text-xs font-normal text-slate-400">
          {`Alta en el SAT: ${fechaAlta}`}
        </Text>
      ) : null}
    </VStack>
  );
}

/**
 * Perfil fiscal del usuario: muestra los datos que la API devuelve en
 * `GET /fiscal-info` y permite actualizarlos reutilizando el modal de setup.
 *
 * La actualización reutiliza `POST /fiscal-info` (el backend no expone PUT),
 * por lo que el modal se precarga con los valores vigentes y se envía el
 * conjunto completo de regímenes fiscales.
 */
export function FiscalProfileScreen() {
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);

  const {
    fiscalInfo,
    isLoading,
    isError,
    refetch,
    submit,
    isSubmitting,
  } = useFiscalInfoSetup({
    onSuccess: () => setIsUpdateVisible(false),
  });

  const initialValues = useMemo<Partial<FiscalInfoPayload> | undefined>(() => {
    if (!fiscalInfo) return undefined;

    return {
      rfc: fiscalInfo.rfc,
      razon_social: fiscalInfo.razon_social,
      email: fiscalInfo.email,
      cp: fiscalInfo.cp,
      address: fiscalInfo.address,
      use_cfdi_code_default: fiscalInfo.use_cfdi_default,
      regimenes: fiscalInfo.regimenes.map((regimen) => ({
        code: regimen.code,
        fecha_alta_sat: normalizeIsoDate(regimen.fecha_alta) || todayIsoDate(),
      })),
    };
  }, [fiscalInfo]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <ActivityIndicator color="#1E40AF" />
        <Text className="text-sm font-normal text-slate-500">
          Consultando tu información fiscal...
        </Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center gap-3">
        <Ionicons name="alert-circle-outline" size={28} color="#e11d48" />
        <Text className="text-sm font-normal text-rose-600">
          No fue posible cargar tu información fiscal.
        </Text>
        <Button
          onPress={() => void refetch()}
          className="h-auto rounded-full bg-[#1E40AF] px-4 py-2">
          <ButtonText className="text-xs font-semibold text-white">
            Reintentar
          </ButtonText>
        </Button>
      </View>
    );
  }

  if (!fiscalInfo) {
    return (
      <View className="flex-1 items-center justify-center gap-3 px-6">
        <Ionicons name="document-text-outline" size={32} color="#94a3b8" />
        <Text className="text-center text-sm font-medium text-slate-500">
          Aún no tienes información fiscal registrada.
        </Text>
        <Text className="text-center text-xs font-normal text-slate-400">
          Captura tus datos fiscales para poder facturar tus gastos.
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full flex-1">
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow gap-4 pb-6">
        <SectionCard title="Datos fiscales" icon="id-card-outline">
          <InfoRow label="RFC" value={fiscalInfo.rfc || "No registrado"} />
          <Divider className="bg-slate-200" />
          <InfoRow
            label="Razón social"
            value={fiscalInfo.razon_social || "No registrado"}
          />
          <Divider className="bg-slate-200" />
          <InfoRow
            label="Correo fiscal"
            value={fiscalInfo.email || "No registrado"}
            breakAll
          />
          <Divider className="bg-slate-200" />
          <InfoRow
            label="Código postal"
            value={fiscalInfo.cp || "No registrado"}
          />
          {fiscalInfo.address ? (
            <>
              <Divider className="bg-slate-200" />
              <InfoRow label="Dirección" value={fiscalInfo.address} />
            </>
          ) : null}
        </SectionCard>

        <SectionCard title="Regímenes fiscales" icon="briefcase-outline">
          {fiscalInfo.regimenes.length > 0 ? (
            fiscalInfo.regimenes.map((regimen) => (
              <RegimenRow key={regimen.code} regimen={regimen} />
            ))
          ) : (
            <Text className="text-sm font-normal text-slate-500">
              Sin regímenes fiscales registrados.
            </Text>
          )}
        </SectionCard>

        <SectionCard title="Uso de CFDI por defecto" icon="receipt-outline">
          <VStack className="w-full gap-1 rounded-2xl bg-slate-50 p-3">
            <HStack className="w-full flex-row items-center gap-2">
              <View className="rounded-lg bg-[#EFF6FF] px-2 py-0.5">
                <Text className="text-xs font-semibold text-[#1D4ED8]">
                  {fiscalInfo.use_cfdi_default}
                </Text>
              </View>
              <Text className="flex-1 text-sm font-semibold text-slate-800">
                {getInvoiceUseDescription(fiscalInfo.use_cfdi_default)}
              </Text>
            </HStack>
            <Text className="text-xs font-normal text-slate-400">
              Se aplica por defecto al facturar tus gastos.
            </Text>
          </VStack>
        </SectionCard>
      </ScrollView>

      <Button
        onPress={() => setIsUpdateVisible(true)}
        className="mb-2 h-auto w-full flex-row items-center justify-center gap-2 rounded-2xl bg-[#1E40AF] px-4 py-3 data-[hover=true]:bg-[#1D4ED8]">
        <Ionicons name="create-outline" size={18} color="#FFFFFF" />
        <ButtonText className="text-sm font-semibold text-white">
          Actualizar
        </ButtonText>
      </Button>

      <FiscalInfoSetupModal
        visible={isUpdateVisible}
        mode="update"
        initialValues={initialValues}
        onSubmit={submit}
        isSubmitting={isSubmitting}
        onClose={() => setIsUpdateVisible(false)}
      />
    </View>
  );
}
