import { createContext, useContext, type ReactNode } from "react";
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AuthLayoutContextValue = {
  compact: boolean;
};

const AuthLayoutContext = createContext<AuthLayoutContextValue>({
  compact: false,
});

export function useAuthLayout() {
  return useContext(AuthLayoutContext);
}

type AuthScreenLayoutProps = {
  children: ReactNode;
};

export function AuthScreenLayout({ children }: AuthScreenLayoutProps) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isTablet = width >= 768;
  const shortestSide = Math.min(width, height);
  const compact = width < 390 || height < 720;
  const cardMaxWidth = isTablet ? 460 : 420;

  const logoScale = Math.min(
    Math.max(shortestSide / 390, 0.9),
    isTablet ? 1.4 : 1.15,
  );
  const logoHeight = Math.round((compact ? 64 : 80) * logoScale);
  const logoWidth = Math.round((logoHeight * 876) / 1685);

  return (
    <AuthLayoutContext.Provider value={{ compact }}>
      <ImageBackground
        source={require("../../../../assets/images/background-image-auth.jpg")}
        className="flex-1"
        resizeMode="cover">
        <View className="absolute inset-0 bg-black/40" />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView
            className="flex-1"
            contentContainerClassName={`flex-grow justify-center ${
              compact ? "px-4" : "px-6"
            }`}
            contentContainerStyle={{
              paddingTop: insets.top + (compact ? 12 : 24),
              paddingBottom: insets.bottom + (compact ? 12 : 24),
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View
              className={`w-full self-center rounded-[28px] bg-[#163F75] shadow-2xl ${
                compact ? "px-5 py-6" : "px-7 py-8"
              }`}
              style={{ maxWidth: cardMaxWidth }}>
              <View
                className={`flex-row items-center justify-center gap-3 ${
                  compact ? "mb-5" : "mb-7"
                }`}>
                <Image
                  source={require("../../../../assets/images/billscan-logo.png")}
                  style={{ width: logoWidth, height: logoHeight }}
                  resizeMode="contain"
                />
                <Text
                  className={`font-bold tracking-tight text-white ${
                    compact ? "text-3xl" : "text-4xl"
                  }`}>
                  BillScan
                </Text>
              </View>
              {children}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </AuthLayoutContext.Provider>
  );
}
