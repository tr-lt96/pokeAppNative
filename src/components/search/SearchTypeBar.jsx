import { POKE_TYPE_LIST, POKE_TYPE_STYLES } from "../../constants";
import { usePokemonSearchContext } from "./context/PokemonSearchContext";
import { ActionIcon, Flex, useMessage, Card, Chip } from "../shared/core";
import { MaterialIcons } from "@expo/vector-icons";

import { getPokemonByTypeData } from "../../functions/pokemon";

const TypeChipVariants = POKE_TYPE_STYLES;

const TypeChip = ({ variant = "default", checked = false, onChange }) => {
  const resolveVariant = (TypeChipVariants[variant] || TypeChipVariants.default)
    ?.color;
  const chipLabel = variant.toUpperCase();

  return (
    <Chip
      color={resolveVariant}
      checked={checked}
      onChange={onChange}
      size="sm"
      radius={"sm"}
      w={90}
    >
      {chipLabel}
    </Chip>
  );
};

export const SearchTypeBar = () => {
  const {
    setSearchType,
    searchType,
    setResultItems,
    pagination,
    resultItems,
    setPagination,
    setSearchMode,
    loading,
    setLoading,
  } = usePokemonSearchContext();
  const { setUserAlert } = useMessage();

  const handleGetPokemonByType = (pokeType) => {
    // fetch 10 pokemon by type
    getPokemonByTypeData(pokeType, pagination)
      .then((result) => {
        if (result) {
          const { results = [], total } = result;
          setResultItems(results);
          if (results.length < total) {
            setPagination({
              ...pagination,
              total: total,
              offset: pagination.offset + results.length,
            });
          }
        } else {
          setUserAlert(
            "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
            "error"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        setLoading(false);
      });
  };

  const handleChipChange = (pokeType) => {
    setSearchType(pokeType);
    setLoading(true);
    handleGetPokemonByType(pokeType);
  };

  const handleSearchSwitch = (pokeType) => {
    setResultItems([]);
    setSearchMode("all");
    handleGetPokemonByType(pokeType);
  };

  return (
    <Card shadow={"md"} radius={"md"} maw={1000} w={"100%"}>
      <Flex gap={"sm"} w={"100%"} align={"flex-start"}>
        <Flex wrap={"wrap"} rowGap={4} columnGap={8} w={"100%"} flex={1}>
          {POKE_TYPE_LIST.map((pokeType, index) => (
            <TypeChip
              key={`filter-${index}-${pokeType}`}
              variant={pokeType}
              checked={searchType === pokeType}
              onChange={() => handleChipChange(pokeType)}
            >
              {pokeType}
            </TypeChip>
          ))}
        </Flex>
        <Flex align={"center"}>
          <ActionIcon radius={"md"} onPress={handleSearchSwitch} size={48}>
            <MaterialIcons name={"search"} size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
