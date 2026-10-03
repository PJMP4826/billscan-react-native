import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type {
  InvoiceFiscalDataViewModel,
  InvoiceFiscalPartyViewModel,
} from "@/src/features/invoices/application/useInvoiceDetail";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, View } from "react-native";

interface InvoiceFiscalDataProps {
  fiscal: InvoiceFiscalDataViewModel;
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

/** Bloque de una parte fiscal (emisor / receptor) con nombre + RFC. */
function FiscalParty({
  title,
  party,
  icon,
}: {
  title: string;
  party: InvoiceFiscalPartyViewModel;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}) {
  return (
    <VStack className="w-full gap-2">
      <HStack className="w-full flex-row items-center gap-2">
        <Ionicons name={icon} size={15} color="#1D4ED8" />
        <Text className="text-xs font-semibold uppercase tracking-wide text-[#1D4ED8]">
          {title}
        </Text>
      </HStack>

      <VStack className="w-full gap-2 rounded-2xl bg-slate-50 p-3">
        <Text className="text-sm font-semibold text-slate-800">
          {party.name}
        </Text>
        <HStack className="flex-row items-center gap-1.5">
          <Text className="text-xs font-normal text-slate-400">RFC</Text>
          <Text className="text-xs font-medium text-slate-700">
            {party.rfcLabel}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
}

/**
 * Tarjeta "Datos fiscales": emisor y receptor (con RFC), régimen fiscal,
 * lugar de expedición y uso del CFDI. Los campos opcionales que la API no
 * devuelve se omiten en lugar de mostrar `null`.
 */
export function InvoiceFiscalData({ fiscal }: InvoiceFiscalDataProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasMandatoryDetail =
    fiscal.regimenFiscalEmisor !== null ||
    fiscal.regimenFiscalReceptor !== null ||
    fiscal.lugarExpedicionLabel !== null ||
    fiscal.usoCfdi !== null;

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40 sm:p-5">
      <VStack className="w-full gap-4">
        {/* Encabezado + toggle "Ver menos / Ver más" */}
        <HStack className="w-full flex-row items-center gap-3">
          <View className="h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Ionicons name="business-outline" size={18} color="#1D4ED8" />
          </View>
          <Heading className="min-w-0 flex-1 text-base font-semibold text-slate-800 sm:text-lg">
            Datos fiscales
          </Heading>

          {hasMandatoryDetail ? (
            <Pressable
              onPress={() => setIsExpanded((previous) => !previous)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={
                isExpanded ? "Ver menos detalles" : "Ver más detalles"
              }
              className="shrink-0 flex-row items-center gap-1 active:opacity-60">
              <Text className="text-xs font-semibold text-[#1E40AF]">
                {isExpanded ? "Ver menos" : "Ver más"}
              </Text>
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={14}
                color="#1E40AF"
              />
            </Pressable>
          ) : null}
        </HStack>

        <FiscalParty
          title="Emisor"
          party={fiscal.emisor}
          icon="storefront-outline"
        />

        <Divider className="bg-slate-200" />

        <FiscalParty
          title="Receptor"
          party={fiscal.receptor}
          icon="person-outline"
        />

        {isExpanded ? (
          <>
            {fiscal.regimenFiscalEmisor ? (
              <>
                <Divider className="bg-slate-200" />
                <InfoField
                  label="Régimen Fiscal del Emisor"
                  value={fiscal.regimenFiscalEmisor}
                />
              </>
            ) : null}

            {fiscal.regimenFiscalReceptor ? (
              <>
                <Divider className="bg-slate-200" />
                <InfoField
                  label="Régimen Fiscal del Receptor"
                  value={fiscal.regimenFiscalReceptor}
                />
              </>
            ) : null}

            {fiscal.usoCfdi ? (
              <>
                <Divider className="bg-slate-200" />
                <InfoField label="Uso del CFDI" value={fiscal.usoCfdi} />
              </>
            ) : null}

            {fiscal.lugarExpedicionLabel ? (
              <>
                <Divider className="bg-slate-200" />
                <InfoField
                  label="Lugar de Expedición"
                  value={fiscal.lugarExpedicionLabel}
                />
              </>
            ) : null}
          </>
        ) : null}
      </VStack>
    </Card>
  );
}
