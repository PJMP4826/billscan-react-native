import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { Platform, Text as RNText } from "react-native";
import { textStyle } from "./styles";

type ITextProps = React.ComponentProps<typeof RNText> &
  VariantProps<typeof textStyle>;

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, ITextProps>(
  function Text(
    {
      className,
      isTruncated,
      bold,
      underline,
      strikeThrough,
      size = "md",
      sub,
      italic,
      highlight,
      style,
      children, // <-- Extraemos los children del resto de las props
      ...props
    },
    ref,
  ) {
    return (
      <RNText
        className={textStyle({
          isTruncated: isTruncated as boolean,
          bold: bold as boolean,
          underline: underline as boolean,
          strikeThrough: strikeThrough as boolean,
          size,
          sub: sub as boolean,
          italic: italic as boolean,
          highlight: highlight as boolean,
          class: className,
        })}
        // includeFontPadding: false sigue siendo útil para el centrado vertical en Android
        style={[
          Platform.OS === "android" && { includeFontPadding: false },
          style,
        ]}
        // Sin esto, RN multiplica el fontSize por el font-scale del sistema en
        // Android/iOS, mientras que en web el tamaño del CSS es fijo. Resultado:
        // el mismo JSX se veía más grande (y más alto) solo en Android.
        // Se coloca ANTES de {...props} para permitir override explícito.
        allowFontScaling={false}
        {...props}
        ref={ref}>
        {children}
      </RNText>
    );
  },
);

Text.displayName = "Text";

export { Text };
