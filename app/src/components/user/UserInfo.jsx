import { ResetPasswordForm } from "../auth/reset-password/ResetPasswordForm";
import {
  Text,
  Card,
  Divider,
  Flex,
  TextInput,
  useTheme,
  Container,
} from "../shared/core";
import { UserProfileHeader } from "./UserProfileHeader";
import { useUser } from "../auth/context/AuthContext";
import { LogoutButton } from "./LogoutButton";

export const UserInfo = () => {
  const { theme } = useTheme();
  const { username = "unown", email } = useUser();

  return (
    <Card maw={500} my={theme.spacing(3)} py={theme.spacing(3)}>
      <Flex direction={"column"} gap={theme.spacing(4)}>
        <UserProfileHeader username={username} />
        <Divider />
        <Container>
          <Text variant="heading-md-strong" mb={theme.spacing(2)}>
            Account information
          </Text>
          <Flex gap={theme.spacing(3)} wrap={"wrap"}>
            <TextInput
              radius={"md"}
              variant={"filled"}
              label={"Username"}
              description={"Your name as a trainer"}
              value={username}
              readOnly
            />
            <TextInput
              radius={"md"}
              variant={"filled"}
              label={"Email"}
              description={"Your email for spams"}
              value={email}
              w={"100%"}
              readOnly
            />
          </Flex>
        </Container>
        <Divider />
        <Container>
          <Text variant="heading-md-strong" mb={theme.spacing(2)}>
            Change password
          </Text>
          <ResetPasswordForm />
        </Container>
        <Divider />
        <Container>
          <Flex justify={"space-between"} align={"center"}>
            <Text variant="heading-md-strong">Click here to log out</Text>
            <LogoutButton />
          </Flex>
        </Container>
      </Flex>
    </Card>
  );
};
