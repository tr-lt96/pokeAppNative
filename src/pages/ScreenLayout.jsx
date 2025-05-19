import { useTheme } from "../components/shared/core";
import { ScrollView, View } from "react-native";
import { KeyboardAvoidingView, Platform } from "react-native";

export const ScreenLayout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets
      style={{
        paddingInline: theme.spacing(4),
        flex: 1,
      }}
    >
      {children}
    </ScrollView>
  );
};
