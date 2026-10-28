import { ScreenContainer } from "@/src/shared/components/ScreenContainer";
import { FiscalProfileScreen } from "@/src/features/fiscal-info/components/FiscalProfileScreen";

export default function ProfileScreen() {
  return (
    <ScreenContainer title="Perfil" showBackButton={false}>
      <FiscalProfileScreen />
    </ScreenContainer>
  );
}
