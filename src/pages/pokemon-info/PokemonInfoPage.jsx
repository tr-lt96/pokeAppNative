// import { useParams } from "react-router";
// import { PokemonTeamListDrawer } from "../../components/pokemon-info/PokemonTeamListDrawer";
// import { useDisclosure } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { getPokemonData } from "../../functions/pokemon";
import { useMessage } from "../../components/shared/core";
import { PokemonInfo } from "../../components/pokemon-info/PokemonInfo";
import { ScreenLayout } from "../ScreenLayout";
import { useRoute } from "@react-navigation/native";

export const PokemonInfoPage = () => {
  const { params } = useRoute();
  const { pokemonName = "" } = params || {};
  const [pokemonData, setPokemonData] = useState();
  const [loading, setLoading] = useState(true);
  const { setUserAlert } = useMessage();

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
      <PokemonInfo
        loading={loading}
        pokemonData={pokemonData}
        handleAddToTeam={() => {}}
        // handleOpenTeamDrawer={handleOpenDrawer}
      />
      {/* <PokemonTeamListDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        currentPokemon={pokemonData}
      /> */}
    </ScreenLayout>
  );
};
