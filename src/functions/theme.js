//  Mantine style props to native css map
// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/core/Box/style-props/style-props.types.ts
const MantineSpacingProps = {
  m: "margin",
  my: "marginBlock",
  mx: "marginInline",
  mt: "marginTop",
  mb: "marginBottom",
  ms: "marginInlineStart",
  me: "marginInlineEnd",
  ml: "marginLeft",
  mr: "marginRight",

  p: "padding",
  py: "paddingBlock",
  px: "paddingInline",
  pt: "paddingTop",
  pb: "paddingBottom",
  ps: "paddingInlineStart",
  pe: "paddingInlineEnd",
  pl: "paddingLeft",
  pr: "paddingRight",
};

const MantineColorProps = {
  bg: "background",
  bgc: "backgroundColor",
  c: "color",
};

const MantineStyleProps = {
  ...MantineSpacingProps,
  ...MantineColorProps,

  bd: "border",
  opacity: "opacity",

  ff: "fontFamily",
  fz: "fontSize",
  fw: "fontWeight",
  lts: "letterSpacing",
  ta: "textAlign",
  lh: "lineHeight",
  fs: "fontStyle",
  tt: "textTransform",
  td: "textDecoration",

  w: "width",
  miw: "minWidth",
  maw: "maxWidth",
  h: "height",
  mih: "minHeight",
  mah: "maxHeight",

  bgsz: "backgroundSize",
  bgp: "backgroundPosition",
  bgr: "backgroundRepeat",
  bga: "backgroundAttachment",

  pos: "position",
  top: "top",
  left: "left",
  bottom: "bottom",
  right: "right",
  inset: "inset",

  display: "display",
  flex: "flex",
};

function resolveColorStyleProp(prop, value, theme) {
  if (MantineColorProps[prop]) {
    return getThemeTokenFromColor(value, theme);
  }

  return value;
}

export function resolveStyleProps(props, theme) {
  const nativeStyle = {};
  Object.keys(props).forEach((prop) => {
    if (MantineStyleProps[prop]) {
      const cssKey = MantineStyleProps[prop];
      const propValue =
        resolveColorStyleProp(prop, props[prop], theme) || props[prop];
      nativeStyle[cssKey] = propValue;
    }
  });

  return nativeStyle;
}

export function getThemeTokenFromColor(color, theme) {
  if (color === "primary") {
    return theme?.colors?.primary || "#000000";
  }

  if (color === "white") {
    return theme?.colors?.white || "#ffffff";
  }

  if (color === "transparent") {
    return theme?.colors?.transparent || "rgba(0, 0, 0, 0)";
  }

  const colorProps = color.split(".");
  const variantColor = colorProps[0];
  const colorIntensity = colorProps[1] || 6;

  return theme?.colors?.[variantColor]?.[colorIntensity] || "#000000";
}

export function getColorWithOpacity(hexCode, opacity = 1) {
  const cleanedHex = hexCode.replace(/^#/, "");

  // Handle short hex (e.g. #abc)
  const fullHex =
    cleanedHex.length === 3
      ? cleanedHex
          .split("")
          .map((ch) => ch + ch)
          .join("")
      : cleanedHex;

  if (fullHex.length !== 6) {
    return hexCode; // Invalid hex code
  }

  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
