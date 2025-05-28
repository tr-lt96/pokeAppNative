import React from "react";
import { Pressable, TouchableOpacity } from "react-native";
import {
  getColorWithOpacity,
  getThemeTokenFromColor,
  resolveStyleProps,
} from "../../../../../functions/theme";
import { useTheme } from "../../contexts/ThemeProvider";
import { Text } from "../Text";

function getButtonTextStyle({ theme, color, variant }) {
  const variantTextColor =
    variant === "light"
      ? getThemeTokenFromColor(color, theme)
      : theme.colors.white;

  return {
    color: variantTextColor,
    textAlign: "center",
  };
}

const ButtonText = ({ buttonText, variant, color }) => {
  const { theme } = useTheme();

  if (typeof buttonText !== "string") {
    return null;
  }

  const textStyle = getButtonTextStyle({ theme, color, variant });

  return (
    <Text variant="label-md" style={textStyle}>
      {buttonText}
    </Text>
  );
};

function getButtonStyle({
  theme,
  color,
  radius,
  fullWidth,
  variant,
  style,
  ...restProps
}) {
  const baseStyles = resolveStyleProps(restProps, theme) || {};

  const backgroundColor = getThemeTokenFromColor(color, theme);
  const variantBackgroundColor =
    variant === "light"
      ? getColorWithOpacity(backgroundColor, 0.2)
      : getThemeTokenFromColor(color, theme);

  const fixedWidth = fullWidth ? "100%" : baseStyles?.width || "auto";

  return {
    padding: 12,
    backgroundColor: variantBackgroundColor,
    ...baseStyles,
    borderRadius: theme.radius[radius],
    width: fixedWidth,
    ...style,
  };
}

function getButtonPressStyle({ theme, color }) {
  const backgroundColor = getThemeTokenFromColor(color, theme);
  const pressedBackgroundColor = getColorWithOpacity(backgroundColor, 0.5);

  return {
    backgroundColor: pressedBackgroundColor,
  };
}

export const Button = (buttonProps) => {
  const { theme } = useTheme();
  // Accept only children with type string or element
  const {
    children,
    color = "primary",
    radius = "md",
    fullWidth = false,
    variant = "filled",
    ...restProps
  } = buttonProps;

  if (typeof children !== "string" && !React.isValidElement(children)) {
    return null;
  }

  const buttonStyle = getButtonStyle({
    theme,
    color,
    radius,
    fullWidth,
    variant,
    ...restProps,
  });

  const buttonPressStyle = getButtonPressStyle({ theme, color });

  const ButtonContent =
    typeof children === "string" ? (
      <ButtonText variant={variant} color={color} buttonText={children} />
    ) : (
      children
    );

  return (
    <TouchableOpacity style={buttonStyle} {...restProps}>
      {ButtonContent}
    </TouchableOpacity>
  );
};
