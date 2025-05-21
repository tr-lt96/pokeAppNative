// import { Button, Flex, Skeleton } from "@mantine/core";
import {
  initSearchContextValue,
  usePokemonSearchContext,
} from "./context/PokemonSearchContext";
import { PokemonInfoCard } from "../shared/info";
import {
  getAllPokemonData,
  getPokemonByTypeData,
} from "../../functions/pokemon";
import { useMessage, useTheme } from "../shared/core";
import { useEffect } from "react";
import { Button, Flex } from "../shared/core";
import { ScrollView } from "react-native";

export const PokemonSearchResults = () => {
  const {
    resultItems = [],
    searchMode,
    setResultItems,
    searchType,
    pagination,
    setPagination,
    loading,
    setLoading,
  } = usePokemonSearchContext();

  const { theme } = useTheme();
  const { setUserAlert } = useMessage();

  const handleFetchBatchPokemon = async (isReset) => {
    let resultData = null;

    if (isReset) {
      setPagination(initSearchContextValue.pagination);
    }

    try {
      if (searchMode === "type") {
        resultData = await getPokemonByTypeData(searchType, pagination);
      } else if (searchMode === "all") {
        resultData = await getAllPokemonData(pagination);
      } else {
        setLoading(false);
        return;
      }

      setLoading(false);

      if (!resultData) {
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        return;
      }

      // filter search result
      const { results = [], total } = resultData || {};
      setResultItems([...resultItems, ...results]);

      setPagination({
        ...pagination,
        total,
        offset: pagination.offset + results.length,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      setUserAlert(
        "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
        "error"
      );
    }
  };

  useEffect(() => {
    handleFetchBatchPokemon(true);
  }, [searchMode]);

  return (
    <ScrollView flex={1}>
      <Flex
        gap={theme.spacing(2)}
        wrap={"wrap"}
        mb={theme.spacing(2)}
        w={"100%"}
        justify="center"
      >
        {resultItems?.length > 0
          ? resultItems.map((item, index) => {
              return (
                <PokemonInfoCard key={`pokemon-result-${index}`} {...item} />
              );
            })
          : null}
      </Flex>
      {searchMode !== "name" && pagination.total > pagination.offset ? (
        // <Skeleton visible={loading}>
        <Button
          radius={"md"}
          mr={theme.spacing(1)}
          visibleFrom={"md"}
          onClick={handleFetchBatchPokemon}
        >
          See some more ?
        </Button>
      ) : // </Skeleton>
      null}
    </ScrollView>
  );
};
