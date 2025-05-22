import { resolveStyleProps } from "../../../../../functions/theme";
import { View } from "react-native";
import { BaseInput } from "./BaseInput";
import { useTheme } from "../../contexts/ThemeProvider";
import { Text } from "../Text";

export const TextInput = ({
  label,
  description,
  style = {},
  errorMessage = "",
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
        style={{
          borderColor: errorMessage ? theme.colors.red[6] : "none",
          borderWidth: errorMessage ? 1 : 0,
        }}
        {...textInputProps}
      />
      {errorMessage ? (
        <Text variant="label-sm" c={"red"} mt={2}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
};
