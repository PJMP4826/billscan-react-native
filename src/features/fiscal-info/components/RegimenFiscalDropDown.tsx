import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  TaxRegime,
  getTaxRegimeDescription,
} from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";

interface RegimenFiscalOption {
  value: string;
  label: string;
}

interface RegimenFiscalDropDownProps {
  selectedValues: string[];
  onValuesChange: (values: string[]) => void;
  isInvalid?: boolean;
}

const taxRegimeOptions: RegimenFiscalOption[] = Object.values(TaxRegime).map(
  (value) => ({
    value,
    label: `${value} - ${getTaxRegimeDescription(value)}`,
  }),
);

const buildTriggerLabel = (selectedValues: string[]): string => {
  if (selectedValues.length === 0) return "Selecciona el Régimen Fiscal";
  if (selectedValues.length <= 2) return selectedValues.join(", ");
  return `${selectedValues.slice(0, 2).join(", ")} (+${
    selectedValues.length - 2
  })`;
};

export default function RegimenFiscalDropDown({
  selectedValues,
  onValuesChange,
  isInvalid,
}: RegimenFiscalDropDownProps) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onValuesChange(selectedValues.filter((item) => item !== value));
      return;
    }
    onValuesChange([...selectedValues, value]);
  };

  return (
    <>
      <VStack space="xs" className="w-full">
        <Button
          variant="outline"
          onPress={() => setShowActionsheet(true)}
          className={`h-auto w-full flex-row items-center justify-between rounded-2xl border bg-white px-4 py-3 ${
            isInvalid ? "border-red-500" : "border-slate-300"
          }`}>
          <ButtonText
            numberOfLines={1}
            className={`flex-1 pr-2 text-left text-sm font-normal ${
              selectedValues.length === 0
                ? "text-slate-400"
                : "text-slate-700"
            }`}>
            {buildTriggerLabel(selectedValues)}
          </ButtonText>
          <Ionicons name="chevron-down" size={18} color="#64748B" />
        </Button>
      </VStack>

      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[85%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <Text className="w-full pb-2 pt-2 text-sm font-bold text-slate-900">
            Regímenes fiscales
          </Text>

          <ActionsheetFlatList
            data={taxRegimeOptions}
            keyExtractor={(item: RegimenFiscalOption) => item.value}
            className="w-full"
            contentContainerStyle={{ paddingBottom: 8 }}
            renderItem={({ item }: { item: RegimenFiscalOption }) => {
              const isSelected = selectedValues.includes(item.value);
              return (
                <Pressable
                  onPress={() => toggleOption(item.value)}
                  className="w-full flex-row items-center gap-3 border-b border-slate-100 py-3">
                  <Ionicons
                    name={isSelected ? "checkbox" : "square-outline"}
                    size={20}
                    color={isSelected ? "#1E40AF" : "#94A3B8"}
                  />
                  <Text
                    className={`flex-1 text-sm ${
                      isSelected
                        ? "font-semibold text-slate-900"
                        : "text-slate-600"
                    }`}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            }}
          />

          <Button
            onPress={() => setShowActionsheet(false)}
            className="mb-6 mt-2 h-auto w-full flex-row items-center justify-center rounded-2xl bg-[#1E40AF] px-4 py-3 data-[hover=true]:bg-[#1D4ED8]">
            <ButtonText>Listo</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
