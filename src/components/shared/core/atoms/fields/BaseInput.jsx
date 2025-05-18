import { resolveStyleProps } from "../../../../../functions/theme";
import { useTheme } from "../../contexts/ThemeProvider";
import { TextInput } from "react-native";
import { Text } from "../Text";
import { Flex } from "../../layouts/Flex";

export const BaseInput = ({ radius = "md", style = {}, ...inputProps }) => {
  const { theme } = useTheme();

  const baseInputStyle = {
    ...theme.typography["body-md"],
    backgroundColor: theme.colors.gray[1],
    paddingInline: theme.spacing(3),
    minHeight: 36,
    borderRadius: theme.radius[radius],
  };

  const resolvedStyle = resolveStyleProps(inputProps, theme);

  return (
    <Flex>
      <TextInput
        style={{
          ...baseInputStyle,
          ...resolvedStyle,
          ...style,
        }}
        {...inputProps}
      />
    </Flex>
  );
};

BaseInput.Label = ({ label, description, style = {}, ...inputLabelProps }) => {
  const { theme } = useTheme();

  const resolvedStyle = resolveStyleProps(inputLabelProps, theme);

  return (
    <Flex
      direction="column"
      gap={2}
      style={{
        ...resolvedStyle,
        ...style,
      }}
    >
      <Text variant="body-md">{label}</Text>
      <Text variant="body-sm" c={"gray.6"}>
        {description}
      </Text>
    </Flex>
  );
};
