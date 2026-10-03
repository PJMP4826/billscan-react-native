import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { InvoiceCertificacionViewModel } from "@/src/features/invoices/application/useInvoiceDetail";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

interface InvoiceSatCertificationProps {
  certificacion: InvoiceCertificacionViewModel;
}

interface InfoFieldProps {
  label: string;
  value: string;
  breakAll?: boolean;
}

function InfoField({ label, value, breakAll }: InfoFieldProps) {
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

/**
 * Tarjeta "Certificación SAT": versión del CFDI, forma y método de pago,
 * folio fiscal (UUID del timbre) y el RFC del proveedor de certificación.
 */
export function InvoiceSatCertification({
  certificacion,
}: InvoiceSatCertificationProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        {/* Encabezado */}
        <HStack className="w-full flex-row items-center gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color="#1D4ED8"
            />
          </View>
          <Heading className="min-w-0 flex-1 text-base font-semibold text-slate-800 sm:text-lg">
            {`Certificación SAT CFDI ${certificacion.version}`}
          </Heading>
        </HStack>

        <InfoField label="Forma de Pago" value={certificacion.formaPago} />

        <Divider className="bg-slate-200" />

        <InfoField label="Método de Pago" value={certificacion.metodoPago} />

        {certificacion.fechaTimbradoLabel ? (
          <>
            <Divider className="bg-slate-200" />
            <InfoField
              label="Fecha de Timbrado"
              value={certificacion.fechaTimbradoLabel}
            />
          </>
        ) : null}

        <Divider className="bg-slate-200" />

        {/* Folio fiscal (UUID) con icono de copiado */}
        <VStack className="w-full gap-1">
          <Text className="text-xs font-normal text-slate-400">
            Folio Fiscal (UUID)
          </Text>
          <HStack className="w-full flex-row items-start gap-2">
            <Text className="min-w-0 flex-1 text-sm font-medium text-slate-700 break-all">
              {certificacion.uuid}
            </Text>
            <Pressable
              onPress={() => {
                // TODO: copiar el folio fiscal al portapapeles.
              }}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Copiar folio fiscal"
              className="shrink-0 h-7 w-7 items-center justify-center rounded-lg active:bg-slate-100">
              <Ionicons name="copy-outline" size={15} color="#1D4ED8" />
            </Pressable>
          </HStack>
        </VStack>

        <Divider className="bg-slate-200" />

        <InfoField
          label="RFC del Proveedor de Certificación (PAC)"
          value={certificacion.rfcProvCertif}
          breakAll
        />
      </VStack>
    </Card>
  );
}
