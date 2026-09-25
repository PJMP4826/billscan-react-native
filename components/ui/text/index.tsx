import React from 'react';
import { Text as RNText, Platform } from 'react-native';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { textStyle } from './styles';

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
      size = 'md',
      sub,
      italic,
      highlight,
      style,
      children, // <-- Extraemos los children del resto de las props
      ...props
    },
    ref
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
        style={[Platform.OS === 'android' && { includeFontPadding: false }, style]}
        {...props}
        ref={ref}
      >
        {children}
        {/* Inyección global del parche para el recorte en Android */}
        {Platform.OS === 'android' ? ' ' : null}
      </RNText>
    );
  }
);

Text.displayName = 'Text';

export { Text };