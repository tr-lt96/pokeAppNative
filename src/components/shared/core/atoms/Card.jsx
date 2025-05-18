import { resolveStyleProps } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";
import { Container } from "../layouts/Container";

export const Card = ({ children, style, radius = "md", ...cardProps }) => {
  const { theme } = useTheme();
  const resolvedStyle = resolveStyleProps(cardProps);

  return (
    <Container
      bg="white"
      p={theme.spacing(2)}
      style={{
        borderRadius: theme.radius[radius],
        ...resolvedStyle,
        ...style,
      }}
    >
      {children}
    </Container>
  );
};
