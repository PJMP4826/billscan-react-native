"use client";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { tva } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { View } from "react-native";

/**
 * Divider atómico (sin dependencia de `@gluestack-ui/core`, que en la versión
 * instalada no expone el módulo `divider`). API compatible con gluestack-ui:
 *
 * <Divider orientation="horizontal" className="my-4" />
 */
const dividerStyle = tva({
  base: "shrink-0 bg-border",
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

type IDividerProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof dividerStyle> & {
    className?: string;
  };

const Divider = React.forwardRef<
  React.ComponentRef<typeof View>,
  IDividerProps
>(function Divider({ className, orientation = "horizontal", ...props }, ref) {
  return (
    <View
      ref={ref}
      role="separator"
      className={dividerStyle({ orientation, class: className })}
      {...props}
    />
  );
});

Divider.displayName = "Divider";

export { Divider };
