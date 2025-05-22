import { useTheme } from "../contexts/ThemeProvider";
import { Container } from "../layouts/Container";

export const Divider = () => {
  const { theme } = useTheme();
  return (
    <Container
      h={5}
      w={"100%"}
      py={theme.spacing(2)}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.gray[2],
        borderStyle: "solid",
      }}
    />
  );
};
