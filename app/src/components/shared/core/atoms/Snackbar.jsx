import { Animated } from "react-native";
import { Card } from "./Card";
import { resolveStyleProps } from "../../../../functions/theme";
import { Container } from "../layouts/Container";
import { Flex } from "../layouts/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Text";
import { useTheme } from "../contexts/ThemeProvider";
import { useMessage } from "../contexts/MessageContext";
import { useRef, useEffect, cloneElement } from "react";

const ALERT_PROPS_BY_SEVERITY = {
  //variant="light" color="blue" title="Alert title" icon={icon}
  success: {
    color: "green",
    title: "Success",
    icon: <MaterialIcons name="sentiment-very-satisfied" size={24} />,
  },
  warning: {
    color: "yellow",
    title: "Warning",
    icon: <MaterialIcons name="sentiment-neutral" size={24} />,
  },
  error: {
    color: "red",
    title: "Error",
    icon: <MaterialIcons name="sentiment-very-dissatisfied" size={24} />,
  },
};

export const Snackbar = (snackBarProps) => {
  const { theme } = useTheme();
  const { message, severity = "warning" } = useMessage();

  const severityProps = ALERT_PROPS_BY_SEVERITY[severity];

  const slideAnim = useRef(new Animated.Value(100)).current;

  const resolvedStyle = resolveStyleProps(snackBarProps);

  const severityIcon = severityProps?.icon
    ? cloneElement(severityProps.icon, {
        color: theme.colors.white,
      })
    : null;

  useEffect(() => {
    if (!!message) {
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [!!message]);

  if (!message) {
    return null;
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 20,
        paddingInline: theme.spacing(3),
        zIndex: 999,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <Flex align={"center"} justify={"center"} px={theme.spacing(3)}>
        <Card w={"100%"} bgc={severityProps.color} style={resolvedStyle}>
          <Flex w={"100%"} align={"center"} gap={theme.spacing(3)}>
            {severityIcon}
            <Text variant="body-md-strong" c="white">
              {severityProps.title}
            </Text>
          </Flex>
          <Text mt={theme.spacing(2)} pl={theme.spacing(9)} c={"white"}>
            {message}
          </Text>
        </Card>
      </Flex>
    </Animated.View>
  );
};
