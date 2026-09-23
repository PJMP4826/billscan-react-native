import { ScrollView, View } from "react-native";
import { ReceiptsCountCard } from "@/src/features/reports/components/ReceiptsCountCard";
import { RecentActivityList } from "@/src/features/reports/components/RecentActivityList";
import { TotalSpentCard } from "@/src/features/reports/components/TotalSpentCard";

export default function IndexScreen() {
  return (
    <ScrollView
      className="flex-1 bg-slate-100"
      contentContainerClassName="flex-grow px-4 py-5">
      <View className="gap-4">
        <ReceiptsCountCard />
        <TotalSpentCard />
        <RecentActivityList />
      </View>
    </ScrollView>
  );
}
