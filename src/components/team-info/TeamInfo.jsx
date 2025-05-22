import { Text, Button, Container, Flex, useTheme } from "../shared/core";
import { PokemonInfoCard } from "../shared/info";
import { useNavigation } from "@react-navigation/native";

export const TeamInfo = ({ team }) => {
  const { theme } = useTheme();
  const { name = "Unown", pokemons = [] } = team;
  const { navigate } = useNavigation();

  const handleToSearch = () => {
    navigate("PokemonSearch");
  };

  return (
    <Container w={"100%"} p={0}>
      <Text variant="heading-xl-strong">{name}</Text>
      <Text>Where your team is judged!</Text>

      <Container w={"100%"} p={0} mt={theme.spacing(3)}>
        {pokemons.length < 6 && (
          <Button radius={"md"} onPress={handleToSearch}>
            Wanna add more pokemons?
          </Button>
        )}
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
