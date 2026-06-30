import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
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

  return (
    <Select selectedValue={selectedValue} onValueChange={onValueChange}>
      <SelectTrigger variant="outline" size="md">
        <SelectInput placeholder="Selecciona una opción" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          {taxRegimeOptions.map((option) => (
            <SelectItem
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
