import { Text, useMessage, Container, Flex, ActionIcon } from "../shared/core";
import { TeamMemberSpriteDisplay } from "../shared/team";
import { useUser } from "../auth/context/AuthContext";
import { addPokemonToTeam } from "../../functions/team";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { sendInAppNoti } from "../../functions/notification";

const AddNewPokemon = ({ handleAddPokemon }) => {
  return (
    <Container w={100} p={0} m={0}>
      <Flex direction={"column"} justify={"center"} align={"center"} gap={4}>
        <ActionIcon variant="light" w={48} h={48} onPress={handleAddPokemon}>
          <MaterialIcons name="add" size={16} />
        </ActionIcon>
      </Flex>
    </Container>
  );
};

export const PokemonTeamDisplay = ({
  team = {},
  currentPokemon = {},
  allowAddPokemon,
}) => {
  const { name = "Unown", pokemons = [], teamId } = team;
  const { updateTeam, teams } = useUser();
  const { setUserAlert } = useMessage();
  const { navigate } = useNavigation();

  const canAddNewPokemon =
    allowAddPokemon &&
    pokemons.length < 6 &&
    pokemons.every((pokemon) => `${pokemon.name}` !== currentPokemon.name);

  const handleAddPokemonToTeam = () => {
    addPokemonToTeam(currentPokemon.name, teamId)
      .then((result) => {
        if (result) {
          const currentTeams = [...teams];
          const teamToUpdate = currentTeams.find(
            (team) => `${team.teamId}` === `${teamId}`
          );

          if (teamToUpdate) {
            teamToUpdate.pokemons.push(currentPokemon);
            updateTeam(currentTeams);
            sendInAppNoti(
              `Added ${currentPokemon.name} to team ${teamToUpdate.name}`
            );
          }
        } else {
          setUserAlert(
            "Oops, we had some issues bringing this pokemon to your gang.",
            "error"
          );
        }
      })
      .catch((error) => {
        console.warn(error);
        setUserAlert(
          "Oops, we had some issues bringing this pokemon to your gang.",
          "error"
        );
      });
  };

  return (
    <Container p={0} w={"100%"}>
      <Text variant={"label-lg-strong"}>{name}</Text>
      <Flex justify={"start"} gap={"sm"} wrap={"wrap"} mb="md">
        {pokemons.map((pokemon, index) => (
          <TeamMemberSpriteDisplay
            key={`${name}-pokemon-${index}`}
            pokemon={pokemon}
            teamName={name}
            w={100}
          />
        ))}
        {canAddNewPokemon && (
          <AddNewPokemon handleAddPokemon={handleAddPokemonToTeam} />
        )}
      </Flex>
    </Container>
  );
};
