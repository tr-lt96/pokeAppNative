import { View } from "react-native";
import { resolveStyleProps } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";

export const Container = ({ children, style = {}, ...containerProps }) => {
  const { theme } = useTheme();
  const resolvedStyle = {
    padding: 0,
    margin: 0,
    ...resolveStyleProps(containerProps, theme),
  };
  return (
    <View
      style={{
        ...resolvedStyle,
        ...style,
      }}
    >
      {children}
    </View>
  );
};
