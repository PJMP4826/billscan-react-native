import { getCurrentPeriod } from "@/src/utils/date-formatter";
import { toSentenceCase } from "@/src/utils/sentence-formatter";
import { View, Text } from "react-native";

export const AppHeader = () => {
  const period = getCurrentPeriod();

  return (
    <View className="flex-row items-center justify-between w-full px-2">
      <Text className="text-white text-2xl font-black tracking-tight">
        BillScan
      </Text>
      <Text className="text-white text-sm font-bold opacity-90">
        {toSentenceCase(period)}
      </Text>
    </View>
  );
};
