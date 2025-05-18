import { useTheme } from "../components/shared/core";
import { View } from "react-native";

export const ScreenLayout = ({ children }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        paddingInline: theme.spacing(8),
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};
