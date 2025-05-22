import { logoutUser } from "../../functions/auth";
import { useMessage, Button, useTheme } from "../shared/core";
import { useUser } from "../auth/context/AuthContext";
import { TOKEN_KEY } from "../../constants";

export const LogoutButton = () => {
  const { theme } = useTheme();
  const { setUserAlert } = useMessage();
  const { resetUserContext } = useUser();
  const handleLogout = () => {
    logoutUser()
      .then((result) => {
        if (!result) {
          setUserAlert("Oops, looks like we don't want you to go", "error");
        } else {
          resetUserContext();
          setUserAlert("Bye bye", "success");
          window.localStorage.removeItem(TOKEN_KEY);
        }
      })
      .catch((error) => {
        setUserAlert("Oops, looks like we don't want you to go", "error");
      });
  };
  return (
    <Button
      color={"red"}
      variant={"light"}
      radius={"md"}
      my={theme.spacing(3)}
      onPress={handleLogout}
    >
      Logout
    </Button>
  );
};
