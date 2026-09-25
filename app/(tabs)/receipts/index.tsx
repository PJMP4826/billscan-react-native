import { ReceiptsListCard } from "@/src/features/receipts/components/ReceiptsListCard";
import { ScreenContainer } from "@/src/shared/components/ScreenContainer";

export default function GastosScreen() {
  return (
    <ScreenContainer title="Detalle de Gastos" showBackButton={false}>
      <ReceiptsListCard />
    </ScreenContainer>
  );
}
