"use client";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { isWeb, tva } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { View } from "react-native";

/**
 * Reset web necesario para que `View` se comporte como un bloque por defecto
 * (misma estrategia que `vstack`/`hstack`/`heading` en este proyecto).
 */
const baseBoxStyle = isWeb
  ? "flex flex-col relative z-0 box-border border-0 list-none min-w-0 min-h-0 bg-transparent items-stretch m-0 p-0 text-decoration-none"
  : "";

export const boxStyle = tva({
  base: baseBoxStyle,
});

type IBoxProps = React.ComponentPropsWithoutRef<typeof View> &
  VariantProps<typeof boxStyle> & {
    className?: string;
  };

const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(
  function Box({ className, ...props }, ref) {
    return (
      <View ref={ref} className={boxStyle({ class: className })} {...props} />
    );
  },
);

Box.displayName = "Box";

export { Box };
