import { registerUser, loginUser } from "../../../functions/auth";
import {
  useTheme,
  TextInput,
  PasswordInput,
  Button,
  Flex,
  useMessage,
} from "../../shared/core";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../../constants";
import { useUser } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../../../constants";

export const RegisterForm = () => {
  const { theme } = useTheme();
  const { setUserAlert } = useMessage();
  const { navigate } = useNavigation();
  const { setupUserContext } = useUser();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegisterFormSubmit = async (values) => {
    if (!values) {
      return;
    }

    if (values.confirmPassword !== values.password) {
      setError(
        "confirmPassword",
        "Doesn't match above password. Are you sure that you can remember this password?"
      );
      return;
    }

    const result = await registerUser({
      username: values.username,
      email: values.email,
      password: values.password,
    });

    if (!result) {
      setUserAlert(
        "Awrr, we want to welcome you in, but it seems like our system have trouble registering you. Have you registered with us before?",
        "error"
      );
    } else {
      setUserAlert(
        `Successful registering yourself with these credentials, please wait while we logging you in...`,
        "success"
      );

      const loginResult = await loginUser({
        username: values.username,
        password: values.password,
      });

      if (!loginResult) {
        setUserAlert(
          "Awrr, can't log you in with these credentials. Something went wrong, can you try loging in again?",
          "error"
        );
        navigate(screenNames.login._name);
      } else {
        const { token } = loginResult;
        if (token) {
          AsyncStorage.setItem(TOKEN_KEY, token);
          setUserAlert(`Welcome, trainer ${values.username} 👋`, "success");
          const isAuth = await setupUserContext();

          if (!isAuth) {
            setUserAlert("Whoopsie, can you refresh the page?", "error");
          }
        } else {
          setUserAlert(
            "We gave you a broken token, can you try logging in again?",
            "error"
          );
          console.error("Auth token is broken");
          navigate(screenNames.login._name);
        }
      }
    }
  };

  return (
    <Flex direction={"column"} gap={theme.spacing(3)}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            radius={"md"}
            variant={"filled"}
            label={"Trainer's name"}
            placeholder="Your name"
            description={'Characters, numbers and ".", "_", "-" only'}
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.username?.message}
          />
        )}
        name="username"
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9_.-]*$/,
            message:
              "Invalid username, must have only non-spacing character and _,.,-",
          },
        }}
      />
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            radius={"md"}
            variant={"filled"}
            label={"Email"}
            description={"Enter your email"}
            placeholder="Your email"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.email?.message}
          />
        )}
        name="email"
        rules={{
          required: true,
          pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]+$/,
            message: "Invalid email",
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
            description={
              "Must have at least a capital character, a number and a special character (e.g. @, #)"
            }
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
          validate: {
            pattern: (value) => {
              if (value.length < 8) {
                return "Password cannot be less than 8 characters.";
              }
              if (!/[A-Z]/.test(value)) {
                return "Where's the uppercase letter?";
              }
              if (!/[0-9]/.test(value)) {
                return "A number, please";
              }
              if (!/[!@#$%^&*,.?]/.test(value)) {
                return "Special character does need to be special - or are you trying to break our system?";
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
            label={"Confirm your password"}
            description={"Re-enter your password"}
            placeholder="********"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.confirmPassword?.message}
          />
        )}
        name="confirmPassword"
        rules={{
          required: true,
        }}
      />

      <Button
        fullWidth
        radius={"md"}
        my={theme.spacing(4)}
        onPress={handleSubmit(handleRegisterFormSubmit)}
      >
        Register
      </Button>
    </Flex>
  );
};
