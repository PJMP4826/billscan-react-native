import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface FiscalInfoFlowContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const FiscalInfoFlowContext = createContext<FiscalInfoFlowContextValue | null>(
  null,
);

export function FiscalInfoFlowProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return (
    <FiscalInfoFlowContext.Provider value={value}>
      {children}
    </FiscalInfoFlowContext.Provider>
  );
}

export function useFiscalInfoFlow() {
  const ctx = useContext(FiscalInfoFlowContext);
  if (!ctx) {
    throw new Error(
      "useFiscalInfoFlow must be used within FiscalInfoFlowProvider",
    );
  }
  return ctx;
}
