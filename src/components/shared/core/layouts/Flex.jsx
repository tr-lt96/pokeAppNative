import { View } from "react-native";
import { resolveStyleProps } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";

// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/Flex/flex-props.ts
const FlexStyleProps = {
  align: "alignItems",
  columnGap: "columnGap",
  direction: "flexDirection",
  gap: "gap",
  justify: "justifyContent",
  rowGap: "rowGap",
  wrap: "flexWrap",
};

function resolveFlexStyleProps(props) {
  const nativeStyle = {};
  Object.keys(props).forEach((prop) => {
    if (FlexStyleProps[prop]) {
      const cssKey = FlexStyleProps[prop];
      const propValue = props[prop];
      nativeStyle[cssKey] = propValue;
    }
  });

  return nativeStyle;
}

export const Flex = ({ children, style = {}, ...flexProps }) => {
  const { theme } = useTheme();
  const resolvedStyle = {
    ...resolveStyleProps(flexProps, theme),
    ...resolveFlexStyleProps(flexProps),
  };

  const flexStyle = {
    padding: 0,
    margin: 0,
    ...resolvedStyle,
  };

  return (
    <View
      style={{
        ...flexStyle,
        ...style,
        display: "flex",
      }}
    >
      {children}
    </View>
  );
};
