// import { Image } from "@mantine/core";
// import { Link } from "react-router";
import { RegisterForm } from "../../components/auth/register/RegisterForm";
// import logo from "../../assets/logo.jpg";
import { Text, Flex } from "../../components/shared/core";
import { AuthLayout } from "./AuthLayout";

const FormHeader = () => {
  return (
    <Flex direction="column" align="center" ta="center">
      {/* <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image> */}
      <Text variant="heading-sm-strong">Create trainer account</Text>
      <Text variant="body-md">Join the world of Pokemon</Text>
    </Flex>
  );
};

// const LoginLink = () => {
//   return (
//     <span className={styleClasses["auth-link"]}>
//       <Text size="sm">Already one of us?</Text>
//       <Link to="/login" style={{ textDecoration: "none" }}>
//         <Text size="sm" c={themeColor.primary} fw={700}>
//           Login
//         </Text>
//       </Link>
//     </span>
//   );
// };

export const RegisterPage = () => {
  return (
    <AuthLayout>
      <FormHeader />
      <RegisterForm />
      {/* <LoginLink /> */}
    </AuthLayout>
  );
};
