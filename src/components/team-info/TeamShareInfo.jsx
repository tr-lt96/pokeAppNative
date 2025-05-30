import { useUser } from "../auth/context/AuthContext";
import {
  Text,
  Button,
  Container,
  Flex,
  useTheme,
  Modal,
  useMessage,
} from "../shared/core";
import { PokemonInfoCard } from "../shared/info";
import { AddTeamForm } from "./AddTeamForm";
import { useEffect, useState } from "react";
import { addPokemonToTeam } from "../../functions/team";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../constants";

export const TeamShareInfo = ({ pokemons = [] }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState(""); // create-team, add-pokemon
  const [createdTeamId, setCreatedTeamId] = useState("");
  const { setUserAlert } = useMessage();
  const { teams, updateTeam } = useUser();
  const { navigate } = useNavigation();

  const handleAddTeamCallback = (teamId) => {
    setStep("add-pokemon");
    setCreatedTeamId(teamId);
  };

  const handlePressAddTeam = () => {
    setStep("create-team");
  };

  const handleBackToTeamList = () => {
    navigate(screenNames.team.list._name);
  };

  const handleAddPokemonsToTeam = async (teamId) => {
    if (!teamId) {
      setUserAlert("Team ID is not valid. Can you try again?");
      setStep("");
      return;
    }

    const batchResult = await Promise.all(
      pokemons.map(async (pokemon) => {
        const result = await addPokemonToTeam(pokemon.name, teamId);
        return {
          pokemon,
          addResult: result,
        };
      })
    );

    if (
      batchResult.some((result) => !result.addResult) ||
      batchResult.length < pokemons.length
    ) {
      setUserAlert(
        "Oops, we had some issues bringing some pokemon to your gang. Can you try again",
        "error"
      );
      setStep("");
      return;
    }

    const currentTeams = [...teams];

    const teamToUpdate = currentTeams.find(
      (team) => `${team.teamId}` === `${teamId}`
    );

    if (teamToUpdate) {
      updateTeam(currentTeams);
      setUserAlert("Successfully copy team, let's go to team page.", "success");
      navigate(screenNames.team.info._name, { teamId });
    }
    setStep("");
  };

  useEffect(() => {
    if (!createdTeamId) {
      return;
    }

    handleAddPokemonsToTeam(createdTeamId);
  }, [createdTeamId]);

  if (!pokemons?.length) {
    return null;
  }

  return (
    <Container w={"100%"} p={0}>
      <Text variant="heading-xl-strong">Team sharing</Text>
      <Text>Curious about other's team?</Text>
      <Container w={"100%"} p={0} mt={theme.spacing(3)}>
        <Flex gap={theme.spacing(3)} wrap={"wrap"}>
          <Button
            color="gray"
            variant="light"
            radius={"md"}
            onPress={handleBackToTeamList}
          >
            Back to team list
          </Button>
          <Button radius={"md"} onPress={handlePressAddTeam}>
            Add the whole team?
          </Button>
        </Flex>
        <Modal
          title={"Create a new team"}
          opened={step === "create-team"}
          onClose={() => setStep("")}
        >
          <AddTeamForm
            handleCloseModal={() => setStep("")}
            addTeamCallback={handleAddTeamCallback}
          />
        </Modal>
        <Flex
          direction={"row"}
          gap={theme.spacing(3)}
          wrap={"wrap"}
          mt={theme.spacing(3)}
        >
          {pokemons.map((pokemonData, index) => (
            <PokemonInfoCard
              key={`pokemonInfo-${index}`}
              resultId={`pokemonInfo-${index}`}
              {...pokemonData}
            />
          ))}
        </Flex>
      </Container>
    </Container>
  );
};
