import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useInvoiceList } from "@/src/features/invoices/application/useInvoiceList";
import { InvoiceCard } from "@/src/features/invoices/components/InvoiceCard";
import { formatCurrency } from "@/src/utils/currency-formatter";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { InvoiceSummaryCard } from "./InvoiceSummaryCard";

export function InvoicesListCard() {
  const { invoices, total, isLoading, isError, refetch } = useInvoiceList({
    page: 1,
    pageSize: 20,
  });

  const [search, setSearch] = useState("");

  // Búsqueda del lado del cliente sobre emisor, folio y serie.
  const filteredInvoices = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) {
      return invoices;
    }

    return invoices.filter((invoice) =>
      [invoice.issuerName, invoice.cfdiLabel, invoice.usageLabel]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [invoices, search]);

  // Total facturado solo para los CFDI visibles (respeta la búsqueda).
  const totalBilled = useMemo(
    () =>
      filteredInvoices.reduce((sum, invoice) => {
        const numeric = Number.parseFloat(
          invoice.totalLabel.replace(/[^0-9.-]/g, ""),
        );
        return Number.isNaN(numeric) ? sum : sum + numeric;
      }, 0),
    [filteredInvoices],
  );

  return (
    <View className="flex-1 w-full">
      {/* Resumen superior */}
      <View className="w-full flex-row gap-3 mb-4">
        <InvoiceSummaryCard
          label="TOTAL FACTURADO"
          value={formatCurrency(totalBilled)}
          icon="document-text-outline"
          iconColor="#2563EB"
          iconBg="#EFF6FF"
        />
        <InvoiceSummaryCard
          label="CFDIS LISTOS"
          value={String(total)}
          icon="copy-outline"
          iconColor="#1E40AF"
          iconBg="#EFF6FF"
        />
      </View>

      {/* Buscador */}
      <Input className="mb-4 h-11 rounded-lg border-slate-200 bg-white">
        <InputSlot className="pl-3">
          <Ionicons name="search" size={18} color="#94a3b8" />
        </InputSlot>
        <InputField
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar comercio o monto..."
          placeholderTextColor="#94a3b8"
        />
      </Input>

      <Text className="mb-3 text-lg font-bold text-slate-900">
        Lista de CFDI Listos
      </Text>

      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="flex-grow pb-10">
        {isLoading && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-normal text-slate-500">
              Consultando CFDI...{" "}
            </Text>
          </View>
        )}

        {!isLoading && isError && (
          <View className="py-10 items-center justify-center gap-3">
            <Ionicons name="alert-circle-outline" size={28} color="#e11d48" />
            <Text className="text-sm font-normal text-rose-600">
              No fue posible cargar los CFDI.{" "}
            </Text>
            <Button
              onPress={() => void refetch()}
              className="rounded-full bg-[#1E40AF] px-4 py-2 h-auto">
              <ButtonText className="text-xs font-semibold text-white">
                Reintentar
              </ButtonText>
            </Button>
          </View>
        )}

        {!isLoading && !isError && filteredInvoices.length === 0 && (
          <View className="py-10 items-center justify-center">
            <Text className="text-sm font-medium text-slate-500">
              {search.trim()
                ? `No se encontraron CFDI para "${search.trim()}".`
                : "No se encontraron CFDI registrados."}
            </Text>
          </View>
        )}

        {!isLoading && !isError && filteredInvoices.length > 0 && (
          <View className="gap-4">
            {filteredInvoices.map((invoice) => (
              <InvoiceCard key={invoice.invoiceUuid} invoice={invoice} />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
