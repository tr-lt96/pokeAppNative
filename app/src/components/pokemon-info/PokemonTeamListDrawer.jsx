import { BottomDrawer, Container, Flex, Text, useTheme } from "../shared/core";
import { PokemonTeamDisplay } from "./PokemonTeamDisplay";
import { useUser } from "../auth/context/AuthContext";
import { ScrollView } from "react-native";

export const PokemonTeamListDrawer = ({ isOpen, onClose, currentPokemon }) => {
  const { teams = [] } = useUser();
  const { theme } = useTheme();
  return (
    <BottomDrawer
      opened={isOpen}
      onClose={onClose}
      title={"Gotta add them all!"}
    >
      <ScrollView>
        <Flex gap={36} direction={"column"}>
          {teams.map((team, index) => {
            return (
              <PokemonTeamDisplay
                key={`team-${index}`}
                team={team}
                currentPokemon={currentPokemon}
                allowAddPokemon
              />
            );
          })}
        </Flex>
      </ScrollView>
      <Container h={150} />
    </BottomDrawer>
  );
};
