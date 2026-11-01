import { HStack } from "@/components/ui/hstack";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IoniconName = NonNullable<ComponentProps<typeof Ionicons>["name"]>;

export type AppToastAction = "success" | "error" | "info" | "warning";

export interface AppToastOptions {
  title: string;
  description?: string;
  action?: AppToastAction;
  duration?: number;
}

interface AppToastProps {
  id: string;
  title: string;
  description?: string;
  action?: AppToastAction;
}

const TOAST_VISUALS: Record<
  AppToastAction,
  { icon: IoniconName; iconColor: string; className: string }
> = {
  success: {
    icon: "checkmark-circle",
    iconColor: "#047857",
    className: "border-emerald-200 bg-emerald-50",
  },
  error: {
    icon: "alert-circle",
    iconColor: "#BE123C",
    className: "border-rose-200 bg-rose-50",
  },
  warning: {
    icon: "warning",
    iconColor: "#B45309",
    className: "border-amber-200 bg-amber-50",
  },
  info: {
    icon: "information-circle",
    iconColor: "#1D4ED8",
    className: "border-blue-200 bg-blue-50",
  },
};

export function AppToast({
  id,
  title,
  description,
  action = "info",
}: AppToastProps) {
  const visual = TOAST_VISUALS[action];

  return (
    <Toast
      nativeID={`toast-${id}`}
      action={action}
      variant="solid"
      className={visual.className}>
      <HStack className="w-full flex-row items-start gap-3">
        <Ionicons name={visual.icon} size={22} color={visual.iconColor} />
        <VStack className="flex-1 gap-0.5">
          <ToastTitle className="text-slate-900">{title}</ToastTitle>
          {description ? (
            <ToastDescription className="text-slate-600">
              {description}
            </ToastDescription>
          ) : null}
        </VStack>
      </HStack>
    </Toast>
  );
}

export function useAppToast() {
  const toast = useToast();

  const show = ({
    title,
    description,
    action = "info",
    duration = 4000,
  }: AppToastOptions) => {
    toast.show({
      placement: "top",
      duration,
      render: ({ id }) => (
        <AppToast
          id={id}
          action={action}
          title={title}
          description={description}
        />
      ),
    });
  };

  return {
    show,
    showSuccess: (title: string, description?: string) =>
      show({ action: "success", title, description }),
    showError: (title: string, description?: string) =>
      show({ action: "error", title, description }),
    showInfo: (title: string, description?: string) =>
      show({ action: "info", title, description }),
    showWarning: (title: string, description?: string) =>
      show({ action: "warning", title, description }),
  };
}
