import { Modal as NativeModal, View } from "react-native";
import { Card } from "./Card";
import {
  getColorWithOpacity,
  resolveStyleProps,
} from "../../../../functions/theme";
import { Container } from "../layouts/Container";
import { Flex } from "../layouts/Flex";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Text";
import { useTheme } from "../contexts/ThemeProvider";
import { ActionIcon } from "./buttons/ActionIcon";

export const Modal = ({ opened, onClose, children, title, ...modalProps }) => {
  const { theme } = useTheme();
  const resolvedStyle = resolveStyleProps(modalProps);

  const titleText =
    typeof title === "string" ? (
      <Text variant="heading-md-strong">{title}</Text>
    ) : (
      title
    );

  return (
    <NativeModal
      animationType={"fade"}
      visible={opened}
      onRequestClose={onClose}
      transparent
      {...modalProps}
    >
      <Container
        flex={1}
        h={"100%"}
        w={"100%"}
        style={{
          backgroundColor: getColorWithOpacity(theme.colors.dark[6], 0.5),
        }}
      >
        <Flex
          h={"100%"}
          align={"center"}
          justify={"center"}
          px={theme.spacing(3)}
        >
          <Card style={resolvedStyle}>
            <Flex w={"100%"} justify={"space-between"} align={"center"}>
              <View />
              {titleText}
              {onClose ? (
                <ActionIcon color={"transparent"} onPress={onClose} size={48}>
                  <MaterialIcons
                    color={theme.colors.dark[6]}
                    name={"close"}
                    size={16}
                  />
                </ActionIcon>
              ) : (
                <View />
              )}
            </Flex>
            <Container mt={theme.spacing(2)}>{children}</Container>
          </Card>
        </Flex>
      </Container>
    </NativeModal>
  );
};
