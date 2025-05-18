import React from "react";
import { useTheme } from "../../contexts/ThemeProvider";
import { Button } from "./Button";
import { getThemeTokenFromColor } from "../../../../../functions/theme";
import { Flex } from "../../layouts/Flex";

export const ActionIcon = (buttonProps) => {
  const { theme } = useTheme();
  // Accept only children with type string or element
  const {
    children,
    color = "primary",
    radius = "md",
    variant = "filled",
    ..._restProps
  } = buttonProps;

  if (!React.isValidElement(children)) {
    return null;
  }

  const iconColor =
    variant === "light"
      ? getThemeTokenFromColor(color, theme)
      : theme.colors.white;

  const ButtonContent = React.cloneElement(children, {
    color: iconColor,
  });

  return (
    <Button p={0} {...buttonProps}>
      <Flex justify="center" align="center" w={"100%"} h={"100%"}>
        {ButtonContent}
      </Flex>
    </Button>
  );
};
