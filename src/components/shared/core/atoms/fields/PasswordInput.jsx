import { resolveStyleProps } from "../../../../../functions/theme";
import { View } from "react-native";
import { BaseInput } from "./BaseInput";
import { useTheme } from "../../contexts/ThemeProvider";

export const PasswordInput = ({
  label,
  description,
  style = {},
  ...passwordInputProps
}) => {
  const { theme } = useTheme();
  const resolvedStyle = resolveStyleProps(passwordInputProps, theme);

  return (
    <View
      style={{
        width: "100%",
        ...resolvedStyle,
        ...style,
      }}
    >
      <BaseInput.Label label={label} description={description} />
      <BaseInput
        mt={theme.spacing(2)}
        {...passwordInputProps}
        secureTextEntry={true}
      />
    </View>
  );
};
