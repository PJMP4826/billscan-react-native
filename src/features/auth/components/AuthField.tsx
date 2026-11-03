import { Text, TextInput, View, type TextInputProps } from "react-native";

import { useAuthLayout } from "./AuthScreenLayout";

type AuthFieldProps = TextInputProps & {
  label: string;
  light?: boolean;
};

export function AuthField({ label, light, ...props }: AuthFieldProps) {
  const { compact } = useAuthLayout();

  return (
    <View className={compact ? "mb-3" : "mb-4"}>
      <Text
        className={`mb-1.5 text-white ${compact ? "text-sm" : "text-base"}`}>
        {label}
      </Text>
      <TextInput
        className={`rounded-xl px-4 text-neutral-900 ${
          compact ? "h-12 text-sm" : "h-14 text-base"
        } ${light ? "bg-white" : "bg-[#e9e9e9]"}`}
        placeholderTextColor="#9ca3af"
        {...props}
      />
    </View>
  );
}
