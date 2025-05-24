// import { Image } from "@mantine/core";
import { Link, usePreventRemove } from "@react-navigation/native";
import { LoginForm } from "../../components/auth/login/LoginForm";
// import { Link } from "react-router";
// import logo from "../../assets/logo.jpg";
import { Text, Flex } from "../../components/shared/core";
import { AuthLayout } from "./AuthLayout";
import { screenNames } from "../../constants";

const FormHeader = () => {
  return (
    <Flex direction="column" align="center" ta="center">
      {/* <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image> */}
      <Text variant="heading-sm-strong">Pokemon trainer login</Text>
      <Text variant="body-md">Log in to build your dream team</Text>
    </Flex>
  );
};

const RegisterLink = () => {
  return (
    <Flex gap={4} justify={"center"}>
      <Text variant="body-md">New trainer?</Text>
      <Link screen={screenNames.register}>
        <Text variant={"body-md-strong"} c={"primary"}>
          Register here.
        </Text>
      </Link>
    </Flex>
  );
};

export const LoginPage = () => {
  return (
    <AuthLayout>
      <FormHeader />
      <LoginForm />
      <RegisterLink />
    </AuthLayout>
  );
};
