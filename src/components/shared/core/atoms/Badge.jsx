import { Container } from "../layouts/Container";
import {
  getThemeTokenFromColor,
  getColorWithOpacity,
  resolveStyleProps,
} from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";
import { Text } from "./Text";

function getBadgeLabelStyle({ theme, color, variant }) {
  const variantTextColor =
    variant === "light"
      ? getThemeTokenFromColor(color, theme)
      : theme.colors.white;

  return {
    color: variantTextColor,
    textAlign: "center",
  };
}

const BadgeLabel = ({ badgeLabel, variant, color, size }) => {
  const { theme } = useTheme();

  if (typeof badgeLabel !== "string") {
    return null;
  }

  const labelStyle = getBadgeLabelStyle({ theme, color, variant });
  const labelSize = size === "sm" ? "label-sm" : "label-md";
  const displayLabel = badgeLabel.toUpperCase();

  return (
    <Text variant={labelSize} style={labelStyle}>
      {displayLabel}
    </Text>
  );
};

function getBadgeStyle({
  theme,
  color,
  radius,
  size,
  variant,
  style,
  ...restProps
}) {
  const baseStyles = resolveStyleProps(restProps, theme);

  const backgroundColor = getThemeTokenFromColor(color, theme);
  const variantBackgroundColor =
    variant === "light"
      ? getColorWithOpacity(backgroundColor, 0.2)
      : getThemeTokenFromColor(color, theme);

  return {
    paddingInline: size === "sm" ? theme.spacing(2) : theme.spacing(3),
    paddingBlock: theme.spacing(1),
    ...baseStyles,
    backgroundColor: variantBackgroundColor,
    borderRadius: theme.radius[radius],
    ...style,
  };
}

export const Badge = ({
  children,
  size = "md",
  color = "primary",
  variant = "filled",
  radius = "xl",
  style,
  ...badgeProps
}) => {
  const { theme } = useTheme();
  const badgeStyle = getBadgeStyle({
    theme,
    size,
    color,
    variant,
    radius,
    style,
    ...badgeProps,
  });

  const BadgeContent =
    typeof children === "string" ? (
      <BadgeLabel
        variant={variant}
        color={color}
        badgeLabel={children}
        size={size}
      />
    ) : (
      children
    );

  return (
    <Container style={badgeStyle} {...badgeProps}>
      {BadgeContent}
    </Container>
  );
};

{
  /* <Badge
          bg={"transparent"}
          p={"sm"}
          radius={"sm"}
          style={{ cursor: "pointer" }}
        ></Badge> */
}

{
  /* <Badge
            key={`pokemon-${index}-${ability}`}
            color={themeColor.primary}
            size="sm"
            radius={"sm"}
          ></Badge> */
}

{
  /* <Badge color={resolveVariant} size={size} radius={"sm"}></Badge> */
}

// size affect text and padding
