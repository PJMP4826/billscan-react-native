import { ActivityIndicator, Pressable, Text } from "react-native";

import { useAuthLayout } from "./AuthScreenLayout";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function AuthButton({
  title,
  onPress,
  loading,
  disabled,
}: AuthButtonProps) {
  const { compact } = useAuthLayout();
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={`mt-2 flex-row items-center justify-center rounded-xl bg-[#d4a437] ${
        compact ? "h-12" : "h-14"
      } ${isDisabled ? "opacity-60" : "active:opacity-80"}`}>
      {loading ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text
          className={`font-bold text-white ${compact ? "text-base" : "text-lg"}`}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
