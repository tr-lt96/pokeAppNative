import { addNewTeam } from "../../functions/team";
import { useUser } from "../auth/context/AuthContext";
import { useMessage, Button, Flex, TextInput, useTheme } from "../shared/core";
import { useForm, Controller } from "react-hook-form";
import * as Notification from "expo-notifications";
import { sendInAppNoti } from "../../functions/notification";

export const AddTeamForm = ({ addTeamCallback, handleCloseModal }) => {
  const { addTeam: addTeamToContext } = useUser();
  const { setUserAlert } = useMessage();
  const { theme } = useTheme();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teamName: "",
    },
  });

  const handleAddTeamForm = async (values) => {
    try {
      const addTeamResult = await addNewTeam(values.teamName);

      if (addTeamResult && !addTeamResult.error) {
        addTeamToContext({
          name: addTeamResult.name,
          teamId: addTeamResult.teamId,
          pokemons: [],
        });
        addTeamCallback?.(addTeamResult.teamId);
        sendInAppNoti(`Team ${values.teamName} added.`);
      } else {
        setUserAlert("Oopsies, error while creating new team", "error");
      }
    } catch (error) {
      console.warn(error);
      setUserAlert("Oopsies, error while creating new team", "error");
    }
  };

  return (
    <Flex direction={"column"} gap={theme.spacing(2)} px={theme.spacing(2)}>
      <Controller
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            radius={"md"}
            label={"Team's name"}
            description={"Warning: can't change team name once set. How sad!"}
            placeholder="Team Rocket"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            errorMessage={errors?.teamName?.message}
          />
        )}
        name="teamName"
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9_.-]*$/,
            message:
              "Invalid teamname, must have only non-spacing character and _,.,-",
          },
        }}
      />
      <Button
        fullWidth
        radius={"md"}
        my={theme.spacing(3)}
        onPress={handleSubmit(handleAddTeamForm)}
      >
        Create team
      </Button>
    </Flex>
  );
};
