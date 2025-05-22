import { Text, Flex, Container, useTheme } from "../shared/core";
import { useMemo } from "react";
import { generateUserProfileColor } from "./get-user-profile-color";

const GeneratedAvatar = ({ username, profileColor }) => {
  const { theme } = useTheme();
  const initLetter = username[0];

  return (
    <Container
      w={60}
      h={60}
      style={{
        backgroundColor: profileColor,
        borderRadius: theme.radius.md,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text fw={800} fz={24} c={"white"}>
        {initLetter}
      </Text>
    </Container>
  );
};

export const UserProfileHeader = ({ username = "Unown" }) => {
  const { theme } = useTheme();
  const profileColor = useMemo(() => generateUserProfileColor(username), []);

  return (
    <Flex align={"center"} gap={theme.spacing(3)} mx={theme.spacing(3)}>
      <GeneratedAvatar profileColor={profileColor} username={username} />
      <Text variant={"heading-lg-strong"}>{username}</Text>
    </Flex>
  );
};
