import { RegisterForm } from "../../components/auth/register/RegisterForm";
// import logo from "../../assets/logo.jpg";
import { Text, Flex } from "../../components/shared/core";
import { AuthLayout } from "./AuthLayout";
import { screenNames } from "../../constants";
import { Link, usePreventRemove } from "@react-navigation/native";

const FormHeader = () => {
  return (
    <Flex direction="column" align="center" ta="center">
      {/* <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image> */}
      <Text variant="heading-sm-strong">Create trainer account</Text>
      <Text variant="body-md">Join the world of Pokemon</Text>
    </Flex>
  );
};

const LoginLink = () => {
  return (
    <Flex gap={4} justify={"center"}>
      <Text variant="body-md">Already one of us?</Text>
      <Link screen={screenNames.login._name}>
        <Text variant={"body-md-strong"} c={"primary"}>
          Login
        </Text>
      </Link>
    </Flex>
  );
};

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <FormHeader />
      <RegisterForm />
      <LoginLink />
    </AuthLayout>
  );
};
