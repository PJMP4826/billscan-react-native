import {
  H1 as H1Base,
  H2 as H2Base,
  H3 as H3Base,
  H4 as H4Base,
  H5 as H5Base,
  H6 as H6Base,
} from "@expo/html-elements";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { styled } from "nativewind";
import React, { forwardRef, memo } from "react";
import { headingStyle } from "./styles";

type IHeadingProps = VariantProps<typeof headingStyle> &
  React.ComponentPropsWithoutRef<typeof H1Base> & {
    as?: React.ElementType;
  };

const H1 = styled(H1Base, { className: "style" });
const H2 = styled(H2Base, { className: "style" });
const H3 = styled(H3Base, { className: "style" });
const H4 = styled(H4Base, { className: "style" });
const H5 = styled(H5Base, { className: "style" });
const H6 = styled(H6Base, { className: "style" });

const MappedHeading = memo(
  forwardRef<React.ComponentRef<typeof H1>, IHeadingProps>(
    function MappedHeading(
      {
        size,
        className,
        isTruncated,
        bold,
        underline,
        strikeThrough,
        sub,
        italic,
        highlight,
        ...props
      },
      ref,
    ) {
      switch (size) {
        case "5xl":
        case "4xl":
        case "3xl":
          return (
            <H1
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        case "2xl":
          return (
            <H2
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        case "xl":
          return (
            <H3
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        case "lg":
          return (
            <H4
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        case "md":
          return (
            <H5
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        case "sm":
        case "xs":
          return (
            <H6
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
        default:
          return (
            <H4
              className={headingStyle({
                size,
                isTruncated: isTruncated as boolean,
                bold: bold as boolean,
                underline: underline as boolean,
                strikeThrough: strikeThrough as boolean,
                sub: sub as boolean,
                italic: italic as boolean,
                highlight: highlight as boolean,
                class: className,
              })}
              {...props}
              // @ts-expect-error : type issue
              ref={ref}
            />
          );
      }
    },
  ),
);

const Heading = memo(
  forwardRef<React.ComponentRef<typeof H1>, IHeadingProps>(function Heading(
    { className, size = "lg", as: AsComp, ...props },
    ref,
  ) {
    const {
      isTruncated,
      bold,
      underline,
      strikeThrough,
      sub,
      italic,
      highlight,
    } = props;

    // En nativo el Heading se renderiza con @expo/html-elements (H1–H6), que
    // inyecta `marginVertical: em(1.33)` como *style inline* — y el style gana
    // sobre la clase `my-0`, dejando ~21px de hueco arriba/abajo en Android
    // (escalado por la fuente del sistema). En web el `my-0` ya lo neutraliza.
    // Forzamos aquí el margen en 0 para que nativo y web queden consistentes;
    // al ser un array, el `style` que pase el consumidor tiene la última palabra.
    const headingStyleProp = [{ marginTop: 0, marginBottom: 0 }, props.style];

    if (AsComp) {
      return (
        <AsComp
          className={headingStyle({
            size,
            isTruncated: isTruncated as boolean,
            bold: bold as boolean,
            underline: underline as boolean,
            strikeThrough: strikeThrough as boolean,
            sub: sub as boolean,
            italic: italic as boolean,
            highlight: highlight as boolean,
            class: className,
          })}
          allowFontScaling={false}
          {...props}
          style={headingStyleProp}
        />
      );
    }

    return (
      <MappedHeading
        className={className}
        size={size}
        ref={ref}
        allowFontScaling={false}
        {...props}
        style={headingStyleProp}
      />
    );
  }),
);

Heading.displayName = "Heading";

export { Heading };
