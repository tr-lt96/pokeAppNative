import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { Container } from "../layouts/Container";
import { getColorWithOpacity } from "../../../../functions/theme";
import { useTheme } from "../contexts/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";
import { ActionIcon } from "./buttons/ActionIcon";
import { Flex } from "../layouts/Flex";
import { Text } from "./Text";

export const BottomDrawer = ({
  title,
  opened,
  onClose,
  children,
  ...drawerProps
}) => {
  const { theme } = useTheme();
  const { height: screenHeight } = useWindowDimensions();
  const drawerHeight = useMemo(() => screenHeight * 0.85, [screenHeight]);
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const titleText =
    typeof title === "string" ? (
      <Text variant="heading-md-strong">{title}</Text>
    ) : (
      title
    );

  const openDrawer = () => {
    Animated.timing(translateY, {
      toValue: screenHeight - drawerHeight,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(onClose);
  };

  useEffect(() => {
    if (opened) openDrawer();
  }, [opened]);

  if (!opened) return null;

  return (
    <Container
      w={"100%"}
      h={"100%"}
      style={{
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        zIndex: 100,
      }}
    >
      <TouchableWithoutFeedback onPress={closeDrawer}>
        <Container
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: getColorWithOpacity(theme.colors.dark[6], 0.5),
          }}
        ></Container>
      </TouchableWithoutFeedback>
      <Animated.View
        style={{
          transform: [{ translateY }],
          height: drawerHeight,
          backgroundColor: theme.colors.white,
          borderTopLeftRadius: theme.radius.lg,
          borderTopRightRadius: theme.radius.lg,
          padding: theme.spacing(3),
        }}
      >
        <Container h={"100%"} w={"100%"}>
          <Flex w={"100%"} justify={"space-between"} align={"center"}>
            {titleText}
            <ActionIcon color={"transparent"} onPress={closeDrawer} size={48}>
              <MaterialIcons
                color={theme.colors.dark[6]}
                name={"close"}
                size={16}
              />
            </ActionIcon>
          </Flex>
          {children}
        </Container>
      </Animated.View>
    </Container>
  );
};
