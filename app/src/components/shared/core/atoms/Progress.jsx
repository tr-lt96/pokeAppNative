import { useTheme } from "../contexts/ThemeProvider";
import { Container } from "../layouts/Container";
import {
  resolveStyleProps,
  getThemeTokenFromColor,
} from "../../../../functions/theme";
import { Text } from "./Text";

function progressBarStyle({ theme, color, value }) {
  const backgroundColor = getThemeTokenFromColor(color, theme);

  return {
    width: `${value}%`,
    backgroundColor,
    borderRadius: theme.radius.sm,
    minWidth: 100,
    minHeight: 20,
  };
}
export const Progress = ({
  color = "primary",
  value = 0,
  style = {},
  ...progressProps
}) => {
  const { theme } = useTheme();

  const progressContainerStyle = resolveStyleProps(progressProps, theme);
  const progressStyle = progressBarStyle({
    theme,
    color,
    value,
    ...progressProps,
  });

  return (
    <Container
      style={{
        backgroundColor: theme.colors.gray[3],
        borderRadius: theme.radius.sm,
        ...progressContainerStyle,
        ...style,
      }}
      {...progressProps}
    >
      <Container style={progressStyle} />
    </Container>
  );
};
