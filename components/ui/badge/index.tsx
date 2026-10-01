"use client";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { tva } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { Text as RNText, View } from "react-native";

/**
 * Badge atómico con la API de gluestack-ui (`action` / `variant` / `size`).
 *
 * IMPORTANTE: al no existir el `createBadge` de `@gluestack-ui/core` en la
 * versión instalada, el contexto de estilos NO se propaga por React Context.
 * Por eso `BadgeText` / `BadgeIcon` reciben explícitamente el mismo `action`
 * y `variant` que su `Badge` padre.
 */
const badgeStyle = tva({
  base: "flex-row items-center justify-center gap-1.5 rounded-full self-start",
  variants: {
    action: {
      info: "bg-[#EFF6FF]",
      success: "bg-[#DCFCE7]",
      warning: "bg-[#FEF3C7]",
      error: "bg-[#FFE4E6]",
      muted: "bg-slate-100",
    },
    variant: {
      solid: "",
      outline: "border bg-transparent",
    },
    outlineColor: {
      info: "border-[#BFDBFE]",
      success: "border-[#86EFAC]",
      warning: "border-[#FCD34D]",
      error: "border-[#FDA4AF]",
      muted: "border-slate-200",
    },
    size: {
      sm: "px-2 py-0.5",
      md: "px-2.5 py-1",
      lg: "px-3 py-1.5",
    },
  },
  defaultVariants: {
    action: "muted",
    variant: "solid",
    size: "md",
  },
});

const badgeTextStyle = tva({
  base: "font-body font-semibold",
  variants: {
    action: {
      info: "text-[#1D4ED8]",
      success: "text-[#15803D]",
      warning: "text-[#B45309]",
      error: "text-[#BE123C]",
      muted: "text-slate-600",
    },
    size: {
      sm: "text-[10px]",
      md: "text-xs",
      lg: "text-sm",
    },
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: { true: "underline" },
    strikeThrough: { true: "line-through" },
    italic: { true: "italic" },
  },
  defaultVariants: {
    action: "muted",
    size: "md",
  },
});

type BadgeAction = "info" | "success" | "warning" | "error" | "muted";

type IBadgeProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof badgeStyle> & {
    className?: string;
    action?: BadgeAction;
    variant?: "solid" | "outline";
    size?: "sm" | "md" | "lg";
  };

const Badge = React.forwardRef<React.ComponentRef<typeof View>, IBadgeProps>(
  function Badge(
    { className, action = "muted", variant = "solid", size = "md", ...props },
    ref,
  ) {
    return (
      <View
        ref={ref}
        className={badgeStyle({
          action,
          variant,
          // el color del borde sólo aplica en `outline`
          outlineColor: variant === "outline" ? action : undefined,
          size,
          class: className,
        })}
        {...props}
      />
    );
  },
);

type IBadgeTextProps = React.ComponentPropsWithoutRef<typeof RNText> &
  VariantProps<typeof badgeTextStyle> & {
    className?: string;
    action?: BadgeAction;
    size?: "sm" | "md" | "lg";
  };

const BadgeText = React.forwardRef<
  React.ComponentRef<typeof RNText>,
  IBadgeTextProps
>(function BadgeText(
  {
    className,
    action = "muted",
    size = "md",
    isTruncated,
    bold,
    underline,
    strikeThrough,
    italic,
    ...props
  },
  ref,
) {
  return (
    <RNText
      ref={ref}
      className={badgeTextStyle({
        action,
        size,
        isTruncated: isTruncated as boolean,
        bold: bold as boolean,
        underline: underline as boolean,
        strikeThrough: strikeThrough as boolean,
        italic: italic as boolean,
        class: className,
      })}
      {...props}
    />
  );
});

type IBadgeIconProps = React.ComponentPropsWithoutRef<typeof View> & {
  className?: string;
};

const BadgeIcon = React.forwardRef<
  React.ComponentRef<typeof View>,
  IBadgeIconProps
>(function BadgeIcon({ className, ...props }, ref) {
  return (
    <View
      ref={ref}
      className={`items-center justify-center ${className ?? ""}`}
      {...props}
    />
  );
});

Badge.displayName = "Badge";
BadgeText.displayName = "BadgeText";
BadgeIcon.displayName = "BadgeIcon";

export { Badge, BadgeIcon, BadgeText };
