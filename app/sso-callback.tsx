import { ActivityIndicator, View } from "react-native";

export default function SSOCallbackScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#0c356a]">
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
