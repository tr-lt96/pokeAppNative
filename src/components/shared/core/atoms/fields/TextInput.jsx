import { resolveStyleProps } from "../../../../../functions/theme";
import { View } from "react-native";
import { BaseInput } from "./BaseInput";
import { useTheme } from "../../contexts/ThemeProvider";

export const TextInput = ({
  label,
  description,
  style = {},
  ...textInputProps
}) => {
  const { theme } = useTheme();
  const resolvedStyle = resolveStyleProps(textInputProps, theme);

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
        mt={label || description ? theme.spacing(2) : 0}
        {...textInputProps}
      />
    </View>
  );
};
