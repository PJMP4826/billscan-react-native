import React from "react"; // ◄ Añadido para los useState
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetSectionList,
  ActionsheetSectionHeaderText,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  Radio,
  RadioGroup,
  RadioLabel,
  RadioIndicator,
  RadioIcon,
} from "@/components/ui/radio";
import { CircleIcon } from "@/components/ui/icon";
import {
  TaxRegime,
  getTaxRegimeDescription,
} from "@/src/features/fiscal-info/domain/enums/tax-regime.enum";

interface RegimenFiscalDropDownProps {
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

export default function RegimenFiscalDropDown({
  selectedValue,
  onValueChange,
}: RegimenFiscalDropDownProps) {
  const taxRegimeOptions = Object.values(TaxRegime).map((value) => ({
    value: value,
    label: `${value} - ${getTaxRegimeDescription(value)}`,
  }));

  const taxRegimeSections = [
    {
      title: "Todos los Regímenes",
      data: Object.values(TaxRegime).map((val) => ({
        value: val,
        label: `${val} - ${getTaxRegimeDescription(val)}`,
      })),
    },
  ];

  const [showActionsheet, setShowActionsheet] = React.useState(false);

  // Estado temporal para cuando el usuario está navegando las opciones del Actionsheet
  const [tempPreference, setTempPreference] = React.useState(
    selectedValue || "",
  );

  // Buscar la etiqueta actual basándonos en lo que React Hook Form tiene guardado
  const currentLabel =
    taxRegimeOptions.find((o) => o.value === selectedValue)?.label ||
    "Selecciona el Régimen Fiscal";

  const handleOpen = () => {
    setTempPreference(selectedValue || ""); // Sincroniza el temporal con el valor real del formulario
    setShowActionsheet(true);
  };

  const handleSelectOption = (newValue: string) => {
    setTempPreference(newValue);
    // console.log(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
    setShowActionsheet(false);
  };

  return (
    <>
      <VStack space="xs" className="w-full">
        {/* Botón estilizado que actúa como un "Select Trigger" */}
        <Button
          variant="outline"
          size="sm"
          className="justify-between w-full h-12 px-3 border border-background-300 rounded-md"
          onPress={handleOpen}>
          <ButtonText className="font-normal text-sm text-typography-700">
            {currentLabel}
          </ButtonText>
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
          <RadioGroup
            value={selectedValue}
            onChange={handleSelectOption}
            className="w-full h-full">
            <ActionsheetSectionList
              sections={taxRegimeSections}
              keyExtractor={(item: any) => item.value}
              contentContainerStyle={{ paddingBottom: 40 }}
              // Cómo se pinta el título de cada grupo
              renderSectionHeader={({ section: { title } }: any) => (
                <ActionsheetSectionHeaderText className="bg-background-0 pt-4 pb-2">
                  <Text className="font-bold text-typography-900 text-sm">
                    {title}
                  </Text>
                </ActionsheetSectionHeaderText>
              )}
              renderItem={({ item }: any) => (
                <Radio
                  value={item.value}
                  className="flex-row justify-between w-full py-3 border-b border-background-100">
                  <RadioLabel className="text-sm flex-1 pr-4">
                    {item.label}
                  </RadioLabel>
                  <RadioIndicator>
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                </Radio>
              )}
            />
          </RadioGroup>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
