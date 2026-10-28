import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, View } from "react-native";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import {
  formatIsoDate,
  normalizeIsoDate,
  toIsoDate,
  todayIsoDate,
} from "@/src/features/fiscal-info/application/dates";

interface DatePickerFieldProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isInvalid?: boolean;
}

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 41 }, (_, index) => CURRENT_YEAR - index);

const daysInMonth = (year: number, month: number): number =>
  new Date(year, month, 0).getDate();

const parseParts = (value?: string) => {
  const iso = normalizeIsoDate(value);
  if (!iso) {
    const today = todayIsoDate().split("-").map(Number);
    return { year: today[0], month: today[1], day: today[2] };
  }
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
};

interface ColumnProps<T> {
  data: T[];
  keyOf: (item: T) => string;
  labelOf: (item: T) => string;
  selectedKey: string;
  onSelect: (item: T) => void;
  testLabel: string;
}

function Column<T>({
  data,
  keyOf,
  labelOf,
  selectedKey,
  onSelect,
  testLabel,
}: ColumnProps<T>) {
  return (
    <View className="flex-1" accessibilityLabel={testLabel}>
      <FlatList
        data={data}
        keyExtractor={keyOf}
        style={{ maxHeight: 220 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = keyOf(item) === selectedKey;
          return (
            <Pressable
              onPress={() => onSelect(item)}
              className={`my-1 items-center rounded-xl px-2 py-2 ${
                isSelected ? "bg-[#EFF6FF]" : "bg-transparent"
              }`}>
              <Text
                className={`text-sm ${
                  isSelected
                    ? "font-bold text-[#1E40AF]"
                    : "font-normal text-slate-600"
                }`}>
                {labelOf(item)}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

export default function DatePickerField({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  isInvalid,
}: DatePickerFieldProps) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [year, setYear] = React.useState(() => parseParts(value).year);
  const [month, setMonth] = React.useState(() => parseParts(value).month);
  const [day, setDay] = React.useState(() => parseParts(value).day);

  const openPicker = () => {
    const parts = parseParts(value);
    setYear(parts.year);
    setMonth(parts.month);
    setDay(parts.day);
    setShowActionsheet(true);
  };

  const applyDate = () => {
    onChange(toIsoDate(year, month, Math.min(day, daysInMonth(year, month))));
    setShowActionsheet(false);
  };

  const handleYearChange = (nextYear: number) => {
    setYear(nextYear);
    setDay((current) => Math.min(current, daysInMonth(nextYear, month)));
  };

  const handleMonthChange = (nextMonth: number) => {
    setMonth(nextMonth);
    setDay((current) => Math.min(current, daysInMonth(year, nextMonth)));
  };

  const days = Array.from(
    { length: daysInMonth(year, month) },
    (_, index) => index + 1,
  );

  return (
    <>
      <Button
        variant="outline"
        onPress={openPicker}
        className={`h-auto w-full flex-row items-center justify-between rounded-2xl border bg-white px-4 py-3 ${
          isInvalid ? "border-red-500" : "border-slate-300"
        }`}>
        <ButtonText
          className={`flex-1 text-left text-sm font-normal ${
            value ? "text-slate-700" : "text-slate-400"
          }`}>
          {value ? formatIsoDate(value) : placeholder}
        </ButtonText>
        <Ionicons name="calendar-outline" size={18} color="#64748B" />
      </Button>

      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[85%]">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <View className="w-full flex-row items-center justify-between pb-2 pt-2">
            <Text className="text-sm font-bold text-slate-900">
              Fecha de alta en el SAT
            </Text>
            <Pressable
              onPress={() => {
                const today = parseParts(todayIsoDate());
                setYear(today.year);
                setMonth(today.month);
                setDay(today.day);
              }}
              className="flex-row items-center gap-1">
              <Ionicons name="today-outline" size={16} color="#1E40AF" />
              <Text className="text-sm font-semibold text-[#1E40AF]">Hoy</Text>
            </Pressable>
          </View>

          <View className="w-full flex-row gap-2">
            <Column
              testLabel="Día"
              data={days}
              keyOf={(item: number) => String(item)}
              labelOf={(item: number) => String(item)}
              selectedKey={String(day)}
              onSelect={(item: number) => setDay(item)}
            />
            <Column
              testLabel="Mes"
              data={MONTHS}
              keyOf={(item: string) => item}
              labelOf={(item: string) => item}
              selectedKey={MONTHS[month - 1]}
              onSelect={(item: string) => handleMonthChange(MONTHS.indexOf(item) + 1)}
            />
            <Column
              testLabel="Año"
              data={YEARS}
              keyOf={(item: number) => String(item)}
              labelOf={(item: number) => String(item)}
              selectedKey={String(year)}
              onSelect={(item: number) => handleYearChange(item)}
            />
          </View>

          <Button
            onPress={applyDate}
            className="mb-6 mt-3 h-auto w-full flex-row items-center justify-center rounded-2xl bg-[#1E40AF] px-4 py-3 data-[hover=true]:bg-[#1D4ED8]">
            <ButtonText>Listo</ButtonText>
          </Button>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
}
