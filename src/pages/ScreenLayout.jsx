import { Container, Snackbar, useTheme } from "../components/shared/core";
import { ScrollView, View } from "react-native";

export const ScreenLayout = ({ children, withScrollView }) => {
  const { theme } = useTheme();
  return (
    <Container flex={1} w={"100%"}>
      {withScrollView ? (
        <ScrollView
          automaticallyAdjustKeyboardInsets
          style={{ flex: 1, width: "100%" }}
        >
          <Container px={theme.spacing(4)} flex={1} w={"100%"}>
            {children}
          </Container>
        </ScrollView>
      ) : (
        <Container flex={1} w={"100%"}>
          {children}
        </Container>
      )}
      <Snackbar />
    </Container>
  );
};
