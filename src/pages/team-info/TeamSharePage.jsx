import { useEffect, useState } from "react";
import { useMessage, Container, useTheme } from "../../components/shared/core";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../ScreenLayout";
import { TeamShareInfo } from "../../components/team-info/TeamShareInfo";
import { searchPokemonByNameId } from "../../functions/pokemon";
import { screenNames } from "../../constants";
import { ActivityIndicator } from "react-native";

export const TeamSharePage = () => {
  const { theme } = useTheme();
  const { params = {} } = useRoute();
  const { pokemons: pokemonsParam = "" } = params;
  const [displayPokemons, setDisplayPokemons] = useState([]);
  const { setUserAlert } = useMessage();
  const { navigate } = useNavigation();

  const handleFetchBatchPokemons = async () => {
    if (!pokemonsParam) {
      setUserAlert("No pokemons here **cricket** ");
      navigate(screenNames.team.list._name);
      return;
    }

    const pokemonIds = pokemonsParam.split("-").map((id) => parseInt(id));

    if (
      !pokemonIds ||
      pokemonIds.length <= 0 ||
      pokemonIds.length > 6 ||
      pokemonIds.some(
        (pokemonId) => isNaN(pokemonId) || pokemonId > 1025 || pokemonId < 0
      )
    ) {
      setUserAlert("Oh no, this team doesn't seem to be valid :(");
      navigate(screenNames.team.list._name);
      return;
    }

    const batchLoadResults = await Promise.allSettled(
      pokemonIds.map(async (pokemonId) => {
        const result = await searchPokemonByNameId(pokemonId);
        return {
          name: result.name,
          pokeId: result.pokeId,
          types: result.types,
          spriteUrl: result.spriteUrl,
        };
      })
    );

    if (
      batchLoadResults.some(
        (result) => result.status === "rejected" || !result.value?.name
      )
    ) {
      setUserAlert("Some pokemon ran away while we're fetching", "error");
    }

    const successFetchedPokemons = batchLoadResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    setDisplayPokemons(successFetchedPokemons);
  };

  useEffect(() => {
    handleFetchBatchPokemons();
  }, []);

  return (
    <ScreenLayout withScrollView>
      <Container w={"100%"} mt={theme.spacing(3)} mb={theme.spacing(6)}>
        {displayPokemons.length === 0 ? (
          <ActivityIndicator />
        ) : (
          <TeamShareInfo pokemons={displayPokemons} />
        )}
      </Container>
    </ScreenLayout>
  );
};
