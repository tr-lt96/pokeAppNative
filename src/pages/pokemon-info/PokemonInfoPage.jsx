// import { useParams } from "react-router";
import { PokemonTeamListDrawer } from "../../components/pokemon-info/PokemonTeamListDrawer";
// import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { getPokemonData } from "../../functions/pokemon";
import {
  Container,
  Text,
  useMessage,
  useTheme,
} from "../../components/shared/core";
import { PokemonInfo } from "../../components/pokemon-info/PokemonInfo";
import { ScreenLayout } from "../ScreenLayout";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native";

export const PokemonInfoPage = () => {
  const { params } = useRoute();
  const { pokemonName = "" } = params || {};
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserAlert } = useMessage();
  const { theme } = useTheme();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  useEffect(() => {
    if (!pokemonName) {
      setUserAlert("Oh no, this pokemon ran away! Maybe try to find it again?");
      return;
    }

    getPokemonData(pokemonName)
      .then((resultData) => {
        setPokemonData({
          ...resultData,
          pokeId: resultData.pokeId,
        });
        setLoading(false);
      })
      .catch((error) => {
        setUserAlert(
          "Oh no, this pokemon ran away! Maybe try to find it again?"
        );
        console.error(error);
        setLoading(false);
      });
  }, [pokemonName]);

  // const [isDrawerOpen, { open: handleOpenDrawer, close: handleCloseDrawer }] =
  //   useDisclosure(false);

  return (
    <ScreenLayout>
      <ScrollView>
        <Container px={theme.spacing(4)}>
          <PokemonInfo
            loading={loading}
            pokemonData={pokemonData}
            handleAddToTeam={handleOpenDrawer}
          />
        </Container>
      </ScrollView>
      <PokemonTeamListDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        currentPokemon={pokemonData}
      />
    </ScreenLayout>
  );
};
