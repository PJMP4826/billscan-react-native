import { InvoicesListCard } from "@/src/features/invoices/components/InvoicesListCard";
import { ScreenContainer } from "@/src/shared/components/ScreenContainer";

export default function InvoicesScreen() {
  return (
    <ScreenContainer
      title="Repositorio de CFDI y Reportes"
      showBackButton={false}>
      <InvoicesListCard />
    </ScreenContainer>
  );
}
