import { resolveStyleProps } from "../../../../../functions/theme";
import { useTheme } from "../../contexts/ThemeProvider";
import { TextInput } from "react-native";
import { Text } from "../Text";
import { Flex } from "../../layouts/Flex";

export const BaseInput = ({
  radius = "md",
  style = {},
  errorMessage = "",
  ...inputProps
}) => {
  const { theme } = useTheme();

  const baseInputStyle = {
    ...theme.typography["body-md"],
    width: "100%",
    backgroundColor: theme.colors.gray[1],
    paddingInline: theme.spacing(3),
    minHeight: 36,
    borderRadius: theme.radius[radius],
    borderColor: errorMessage ? theme.colors.red[6] : "none",
    borderWidth: errorMessage ? 1 : 0,
  };

  const resolvedStyle = resolveStyleProps(inputProps, theme);

  return (
    <>
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
      {errorMessage ? (
        <Text variant="label-sm" c={"red"} mt={2}>
          {errorMessage}
        </Text>
      ) : null}
    </>
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
