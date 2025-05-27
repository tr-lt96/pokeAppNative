import { addNewTeam } from "../../functions/team";
import { useUser } from "../auth/context/AuthContext";
import { useMessage, Button, Flex, TextInput, useTheme } from "../shared/core";
import { useForm, Controller } from "react-hook-form";

export const AddTeamForm = ({ handleCloseModal }) => {
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

  const handleAddTeamForm = (values) => {
    addNewTeam(values.teamName)
      .then((result) => {
        if (result) {
          addTeamToContext({
            name: result.name,
            teamId: result.teamId,
            pokemons: [],
          });
          handleCloseModal();
        } else {
          setUserAlert("Oopsies, error while creating new team", "error");
        }
      })
      .catch((error) => {
        console.error(error);
        setUserAlert("Oopsies, error while creating new team", "error");
      });
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
