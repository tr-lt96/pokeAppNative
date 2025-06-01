import { Container } from "../layouts/Container";
import {
  getThemeTokenFromColor,
  getColorWithOpacity,
  resolveStyleProps,
} from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";
import { Text } from "./Text";
import { Flex } from "../layouts/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function getChipLabelStyle({ theme, color, checked }) {
  const checkVariantTextColor = checked
    ? theme.colors.white
    : getThemeTokenFromColor(color, theme);

  return {
    color: checkVariantTextColor,
    textAlign: "center",
  };
}

const ChipLabel = ({ chipLabel, checked, color, size }) => {
  const { theme } = useTheme();

  if (typeof chipLabel !== "string") {
    return null;
  }

  const labelStyle = getChipLabelStyle({ theme, color, checked });
  const labelSize = size === "sm" ? "label-sm" : "label-md";
  const displayLabel = chipLabel.toUpperCase();

  return (
    <Flex gap={theme.spacing(1)} align="center" justify="center">
      {checked ? (
        <MaterialIcons name="check" size={14} color={theme.colors.white} />
      ) : null}
      <Text variant={labelSize} style={labelStyle}>
        {displayLabel}
      </Text>
    </Flex>
  );
};

function getChipStyle({
  theme,
  color,
  radius,
  size,
  checked,
  style,
  ...restProps
}) {
  const baseStyles = resolveStyleProps(restProps, theme);

  const backgroundColor = getThemeTokenFromColor(color, theme);
  const checkVariantBackgroundColor = checked
    ? getThemeTokenFromColor(color, theme)
    : getColorWithOpacity(backgroundColor, 0.2);

  return {
    paddingInline: size === "sm" ? theme.spacing(2) : theme.spacing(3),
    paddingBlock: theme.spacing(1),
    ...baseStyles,
    backgroundColor: checkVariantBackgroundColor,
    borderRadius: theme.radius[radius],
    ...style,
  };
}

export const Chip = ({
  children,
  size = "md",
  color = "primary",
  radius = "xl",
  style,
  checked = false,
  onChange,
  ...chipProps
}) => {
  const { theme } = useTheme();
  const chipStyle = getChipStyle({
    theme,
    size,
    color,
    radius,
    style,
    checked,
    ...chipProps,
  });

  const ChipContent =
    typeof children === "string" ? (
      <ChipLabel
        checked={checked}
        color={color}
        chipLabel={children}
        size={size}
      />
    ) : (
      children
    );

  return (
    <Pressable
      onPress={() => {
        onChange?.();
      }}
      style={chipStyle}
      {...chipProps}
    >
      {ChipContent}
    </Pressable>
  );
};
