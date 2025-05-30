import { screenNames } from "../../constants";
import {
  Text,
  Button,
  Container,
  Flex,
  useTheme,
  ActionIcon,
  useMessage,
} from "../shared/core";
import { PokemonInfoCard } from "../shared/info";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Share } from "react-native";

export const TeamInfo = ({ team }) => {
  const { theme } = useTheme();
  const { name = "Unown", pokemons = [] } = team;
  const { navigate } = useNavigation();
  const { setUserAlert } = useMessage();

  const handleToSearch = () => {
    navigate(screenNames.pokemon.search._name);
  };

  const handleShare = async () => {
    try {
      const getShareEncoded = pokemons
        .map((pokemon) => pokemon.pokeId)
        .join("-");
      const shareURL = `poketeam://Home/Team/TeamShare?pokemons=${getShareEncoded}`;

      const shareResult = await Share.share({
        title: `Share team ${name} to your friends\n`,
        url: shareURL,
        message: `Share team ${name} to your friends`,
      });

      if (shareResult.action === Share.sharedAction) {
        setUserAlert("Successfully shared", "success");
      }
    } catch (error) {
      console.error(error);
      setUserAlert("Oops, this team is being shy, can you try again?", "error");
    }
  };

  return (
    <Container w={"100%"} p={0}>
      <Flex w={"100%"} justify={"space-between"}>
        <Container>
          <Text variant="heading-xl-strong">{name}</Text>
          <Text>Where your team is judged!</Text>
        </Container>

        <ActionIcon
          radius={"md"}
          size={48}
          variant="light"
          color="pink"
          onPress={handleShare}
        >
          <MaterialIcons name={"share"} size={16} />
        </ActionIcon>
      </Flex>

      <Container w={"100%"} p={0} mt={theme.spacing(3)}>
        {pokemons.length < 6 && (
          <Button radius={"md"} onPress={handleToSearch}>
            Add more pokemons?
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
