import { ScrollView, Text, View } from "react-native";
import { DeductibleExpensesCard } from "@/src/features/reports/components/DeductibleExpensesCard";

export default function IndexScreen() {
  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerClassName="flex-grow px-4 py-5">
      <View className="gap-4">
        <DeductibleExpensesCard />
      </View>
    </ScrollView>
  );
}
