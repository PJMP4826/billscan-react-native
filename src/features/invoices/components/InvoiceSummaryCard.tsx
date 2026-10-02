import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

interface SummaryCardProps {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBg: string;
}

export function InvoiceSummaryCard({
  label,
  value,
  icon,
  iconColor,
  iconBg,
}: SummaryCardProps) {
  return (
    <View className="min-w-0 flex-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-300/40">
      <View
        className="mb-3 h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text className="text-xs font-medium tracking-wide text-slate-400">
        {label}
      </Text>
      <Text
        className="mt-1 text-2xl font-bold text-slate-950">
        {value}
      </Text>
    </View>
  );
}