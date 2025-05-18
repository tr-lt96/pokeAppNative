import {
  Flex,
  TextInput,
  PasswordInput,
  Button,
  useTheme,
} from "../../shared/core";
// import { useForm } from "@mantine/form";
// import { useMessage } from "../../shared/core";
import { TOKEN_KEY } from "../../../constants";
import { loginUser } from "../../../functions/auth";
import { useUser } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";

// import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { theme } = useTheme();
  // const { setUserAlert } = useMessage();
  // const { resetUserContext } = useUser();
  // const navigate = useNavigate();

  // const loginForm = useForm({
  //   mode: "uncontrolled",
  //   initialValues: {
  //     username: "",
  //     password: "",
  //   },

  //   validate: {
  //     username: (value) => {
  //       if (value.includes("@")) {
  //         return /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(value)
  //           ? null
  //           : "Invalid email";
  //       } else {
  //         return /^[a-zA-Z0-9_.-]*$/.test(value) ? null : "Invalid username";
  //       }
  //     },
  //   },
  // });

  // const handleSubmit = (values) => {
  //   if (!values) {
  //     return;
  //   }

  //   loginUser({ username: values.username, password: values.password }).then(
  //     (result) => {
  //       if (!result) {
  //         setUserAlert(
  //           "Awrr, can't log you in with these credentials. Have you registered with us?",
  //           "error"
  //         );
  //       } else {
  //         const { token } = result;
  //         if (token) {
  //           AsyncStorage.setItem(TOKEN_KEY, token);
  //           setUserAlert(`Welcome, trainer ${values.username} 👋`, "success");
  //           resetUserContext().then((isAuth) => {
  //             if (isAuth) {
  //               navigate("/pokemon/search");
  //             } else {
  //               setUserAlert("Whoopsie, can you refresh the page?", "error");
  //             }
  //           });
  //         } else {
  //           setUserAlert(
  //             "We gave you a broken token, can you try logging in again?",
  //             "error"
  //           );
  //           console.error("Auth token is broken");
  //         }
  //       }
  //     }
  //   );
  // };

  return (
    // <form onSubmit={loginForm.onSubmit(handleSubmit)}>
    <View>
      <Flex direction={"column"} gap={theme.spacing(3)}>
        <TextInput
          required
          radius={"md"}
          variant={"filled"}
          label={"Trainer's name"}
          description={"Enter your username or email"}
          placeholder="Username or email"
          // {...loginForm.getInputProps("username")}
        />
        <PasswordInput
          required
          radius={"md"}
          variant={"filled"}
          label={"Password"}
          description={"Enter password"}
          placeholder="********"
          // {...loginForm.getInputProps("password")}
        />

        <Button type="submit" fullWidth radius={"md"} my={theme.spacing(4)}>
          Log in
        </Button>
      </Flex>
    </View>
  );
};
