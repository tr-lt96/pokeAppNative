// import { useForm } from "@mantine/form";
import { updateUserPassword } from "../../../functions/auth";
import {
  useTheme,
  PasswordInput,
  Button,
  Flex,
  useMessage,
} from "../../shared/core";
import { useForm, Controller } from "react-hook-form";

export const ResetPasswordForm = () => {
  const { theme } = useTheme();
  const { setUserAlert } = useMessage();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPasswordSubmit = (values) => {
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

    updateUserPassword({
      currentPassword: values.currentPassword,
      newPassword: values.password,
      confirmNewPassword: values.confirmPassword,
    }).then((result) => {
      if (result) {
        setUserAlert(`Successful update your password.`, "success");
      } else {
        setUserAlert("Oops, we messed up, can you try again?", "error");
      }
    });
  };

  return (
    // <form onSubmit={registerForm.onSubmit(handleSubmit)}>
    <Flex direction={"column"} gap={theme.spacing(3)}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <PasswordInput
            radius={"md"}
            label={"Current Password"}
            description={"Your ol' password - hope that you still remember it"}
            placeholder="********"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.currentPassword?.message}
          />
        )}
        name="currentPassword"
        rules={{
          required: true,
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

      <Flex justify={"flex-end"}>
        <Button
          radius={"md"}
          my={theme.spacing(4)}
          onPress={handleSubmit(handleResetPasswordSubmit)}
        >
          Update password
        </Button>
      </Flex>
    </Flex>
    // </form>
  );
};
