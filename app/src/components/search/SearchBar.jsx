import { useForm, Controller, useWatch } from "react-hook-form";
import { searchPokemonByNameId } from "../../functions/pokemon";
import {
  initSearchContextValue,
  usePokemonSearchContext,
} from "./context/PokemonSearchContext";
import {
  useMessage,
  useTheme,
  Card,
  TextInput,
  Flex,
  ActionIcon,
} from "../shared/core";
import { MaterialIcons } from "@expo/vector-icons";

export const SearchBar = () => {
  const { theme } = useTheme();
  const {
    searchMode,
    setSearchQuery,
    setResultItems,
    setSearchMode,
    setLoading,
    setPagination,
  } = usePokemonSearchContext();
  const { setUserAlert } = useMessage();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    resetField,
  } = useForm({
    defaultValues: {
      pokemonName: "",
    },
  });

  const handleSearch = (values) => {
    setLoading(true);
    setSearchMode("name");
    let searchQuery = values.pokemonName;
    // Sanitise search input
    if (!/^[a-zA-Z-]*$/.test(values.pokemonName)) {
      // Probaly user is searching pokemon via a pokemon number
      searchQuery = parseInt(values.pokemonName);
      if (isNaN(searchQuery)) {
        setError("pokemonName", {
          message:
            "You know that's not a valid pokemon name or number - are you trying to break the system?",
        });
        return;
      }
    }

    setSearchQuery(searchQuery);

    searchPokemonByNameId(searchQuery)
      .then((pokemonData) => {
        if (pokemonData) {
          setResultItems([pokemonData]);
        } else {
          setUserAlert(
            "Pokemon not found, are you sure it's a pokemon ?",
            "error"
          );
        }
        setLoading(false);
      })
      .catch((error) => {
        setUserAlert(
          "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
          "error"
        );
        setLoading(false);
      });
  };

  const handleSwitchSearchType = () => {
    setResultItems([]);
    setPagination(initSearchContextValue.pagination);
    setSearchMode("type");
  };

  const handleReset = () => {
    resetField("pokemonName");
    setSearchMode("all");
  };

  return (
    <Card radius={"md"} w={"100%"}>
      <Flex
        gap={theme.spacing(2)}
        w={"100%"}
        align={"flex-start"}
        justify={"start"}
      >
        <Controller
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              radius={"md"}
              placeholder="Search pokemon by name"
              w={"auto"}
              mih={48}
              flex={1}
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              errorMessage={errors?.pokemonName?.message}
            />
          )}
          name="pokemonName"
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9-]*$/,
              message: "Invalid pokemon name or ID",
            },
          }}
        />

        <Flex align={"center"} gap={theme.spacing(2)}>
          {searchMode === "name" ? (
            <ActionIcon
              radius={"md"}
              size={48}
              onPress={handleReset}
              variant="light"
              color={"red"}
            >
              <MaterialIcons name={"close"} size={16} />
            </ActionIcon>
          ) : null}
          <ActionIcon
            radius={"md"}
            size={48}
            onPress={handleSubmit(handleSearch)}
          >
            <MaterialIcons name={"search"} size={16} />
          </ActionIcon>
          <ActionIcon
            radius={"md"}
            variant="light"
            onPress={handleSwitchSearchType}
            size={48}
          >
            <MaterialIcons name={"category"} size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
    </Card>
  );
};
