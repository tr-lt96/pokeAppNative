// import { Image } from "@mantine/core";
import { LoginForm } from "../../components/auth/login/LoginForm";
// import { Link } from "react-router";
// import logo from "../../assets/logo.jpg";
import { Text, Flex } from "../../components/shared/core";
import { AuthLayout } from "./AuthLayout";

const FormHeader = () => {
  return (
    <Flex direction="column" align="center" ta="center">
      {/* <Image src={logo} radius={"md"} w={150} mb={"sm"}></Image> */}
      <Text variant="heading-sm-strong">Pokemon trainer login</Text>
      <Text variant="body-md">Log in to build your dream team</Text>
    </Flex>
  );
};

// const RegisterLink = () => {
//   return (
//     <span className={styleClasses["auth-link"]}>
//       <Text size="sm">New trainer?</Text>
//       <Link to="/register" style={{ textDecoration: "none" }}>
//         <Text size="sm" c={themeColor.primary} fw={700}>
//           Register here.
//         </Text>
//       </Link>
//     </span>
//   );
// };

export const LoginPage = () => {
  return (
    <AuthLayout>
      <FormHeader />
      <LoginForm />
      {/* <RegisterLink /> */}
    </AuthLayout>
  );
};

// .form-header {
//     display: flex;
//     flex-direction: column;
//     text-align: center;
//     align-items: center;
// }

// .auth-link {
//     display: flex;
//     gap: 4px;
//     justify-content: center;
// }
