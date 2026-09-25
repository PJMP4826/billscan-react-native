import AccountAvatar from "@/src/shared/components/AccountAvatar";
import { useFiscalInfoQuery } from "@/src/features/fiscal-info/infrastructure/repositories/fiscal-info.repository";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heading } from "./ui/heading";

export const AppHeader = () => {
  const { data: fiscalInfo } = useFiscalInfoQuery();
  const accountName = fiscalInfo?.razon_social ?? "Usuario";
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#1E40AF" }}>
      {/* Contenedor interno con altura fija (h-14 = 56px) sin paddings extraños */}
      <View className="flex-row items-center justify-between w-full h-14 px-4">
        {/* Columna Izquierda */}
        <View className="flex-1 items-start justify-center">
          <AccountAvatar name={accountName}/>
        </View>

        {/* Título Central */}

        {/* <Text className="text-white text-2xl font-normal tracking-tight text-center px-4">
            BillScan
          </Text> */}

        <Heading className="text-white text-[22px] font-normal text-center px-5">
          BillScan
        </Heading>

        {/* Columna Derecha (Spacer) */}
        <View className="flex-1" />
      </View>
    </View>
  );
};
