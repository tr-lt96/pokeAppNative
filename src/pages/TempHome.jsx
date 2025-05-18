import { Button, useTheme } from "../components/shared/core";
import { PasswordInput } from "../components/shared/core/atoms/fields/PasswordInput";
import { View, StyleSheet } from "react-native";
import { Text } from "../components/shared/core";
import { StatusBar } from "expo-status-bar";
import { ScreenLayout } from "./ScreenLayout";
import { useNavigation } from "@react-navigation/native";

const TestComponent = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  return (
    <Button
      onPress={() => {
        navigate("Register");
      }}
    >
      Navigate to login
    </Button>
  );
};

export const TempHome = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={{ fontSize: 14 }}>
          Open up App.js to start working on your app!
        </Text>
        <TestComponent />
        <StatusBar style="auto" />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
  },
});

// icons
// IconCirclesFilled,
//   IconUserFilled,
// IconPlus, IconEye
// IconSearch, IconCategoryFilled, IconX
// IconMoodConfuzedFilled,
//   IconMoodSmileFilled,
//   IconMoodWrrrFilled,
// IconTrash
// IconCircleFilled

//core

// ActionIcon, done
// Button (done),
// Flex (done)
// // Container (done)

// TextInput, (done)
// PasswordInput, (done)

// Anchor, - should be same as button link ?
// Badge,
// Card, (done)
// Image,

// Skeleton <- optional
// useMatches <- only use xs
// ActionIcon, done
// Drawer
// Chip,
// Affix,
// Alert
// Modal
// Rating
// Progress
// Rating
