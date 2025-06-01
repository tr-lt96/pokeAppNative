import {
  Flex,
  TextInput,
  PasswordInput,
  Button,
  useTheme,
  useMessage,
  Container,
} from "../../shared/core";
import { TOKEN_KEY } from "../../../constants";
import { loginUser } from "../../../functions/auth";
import { useUser } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { sendInAppNoti } from "../../../functions/notification";

export const LoginForm = () => {
  const { theme } = useTheme();
  const { setUserAlert } = useMessage();
  const { setupUserContext } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLoginFormSubmit = async (values) => {
    if (!values) {
      return;
    }

    const result = await loginUser({
      username: values.username,
      password: values.password,
    });

    if (!result) {
      setUserAlert(
        "Awrr, can't log you in with these credentials. Have you registered with us?",
        "error"
      );
    } else {
      const { token } = result;
      if (token) {
        AsyncStorage.setItem(TOKEN_KEY, token);

        const isAuth = await setupUserContext();

        if (!isAuth) {
          setUserAlert("Whoopsie, can you refresh the page?", "error");
        } else {
          setUserAlert(`Welcome, trainer ${values.username} 👋`, "success");
          sendInAppNoti(`Your session is about to expired`, 28 * 60);
        }
      } else {
        setUserAlert(
          "We gave you a broken token, can you try logging in again?",
          "error"
        );
      }
    }

    setLoading(false);
  };

  return (
    <Flex direction={"column"} gap={theme.spacing(3)}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            radius={"md"}
            label={"Trainer's name"}
            description={"Enter your username or email"}
            placeholder="Username or email"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.username?.message}
          />
        )}
        name="username"
        rules={{
          required: true,
          validate: {
            pattern: (value) => {
              if (value.includes("@")) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]+$/.test(value)
                  ? null
                  : "Invalid email";
              } else {
                return /^[a-zA-Z0-9_.-]*$/.test(value)
                  ? null
                  : "Invalid username";
              }
            },
          },
        }}
      />

      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <PasswordInput
            radius={"md"}
            variant={"filled"}
            label={"Password"}
            description={"Enter password"}
            placeholder="********"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.password?.message}
          />
        )}
        name="password"
        rules={{
          required: true,
        }}
      />

      {loading ? (
        <Container mt={theme.spacing(2)}>
          <ActivityIndicator />
        </Container>
      ) : (
        <Button
          fullWidth
          radius={"md"}
          my={theme.spacing(4)}
          onPress={handleSubmit(handleLoginFormSubmit)}
        >
          Log in
        </Button>
      )}
    </Flex>
  );
};
