import { resolveStyleProps } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";
import { Text as NativeText } from "react-native";

export const Text = ({
  variant = "body-md",
  children,
  style,
  ...textProps
}) => {
  const { theme } = useTheme();

  if (typeof children !== "string") {
    return null;
  }

  const textStyle = {
    color: theme.colors.dark[6],
    ...(theme.typography[variant] || theme.typography["body-md"]),
    ...resolveStyleProps(textProps, theme),
    ...style,
  };

  return <NativeText style={textStyle}>{children}</NativeText>;
};
