// import { useForm } from "@mantine/form";
import { searchPokemonByNameId } from "../../functions/pokemon";
import { usePokemonSearchContext } from "./context/PokemonSearchContext";
import {
  useMessage,
  useTheme,
  Card,
  TextInput,
  Flex,
  ActionIcon,
} from "../shared/core";
import { MaterialIcons } from "@expo/vector-icons";

const SearchButtonIcon = () => {
  return <MaterialIcons name={"search"} size={16} />;
};

const TypeSearchSwitchButtonIcon = () => {
  return <MaterialIcons name={"category"} size={16} />;
};

const ResetSearchIcon = () => {
  return <MaterialIcons name={"close"} size={16} />;
};

export const SearchBar = () => {
  const { theme } = useTheme();
  const { setSearchQuery, setResultItems, setSearchMode, setLoading } =
    usePokemonSearchContext();
  const { setUserAlert } = useMessage();
  // const searchForm = useForm({
  //   initialValues: {
  //     pokemonName: "",
  //   },

  //   validate: {
  //     pokemonName: (value) => {
  //       return /^[a-zA-Z0-9-]*$/.test(value)
  //         ? null
  //         : "Invalid pokemon name or ID";
  //     },
  //   },
  // });

  // const handleSearch = (values) => {
  //   setLoading(true);
  //   setSearchMode("name");
  //   let searchQuery = values.pokemonName;
  //   // Sanitise search input
  //   if (!/^[a-zA-Z-]*$/.test(values.pokemonName)) {
  //     // Probaly user is searching pokemon via a pokemon number
  //     searchQuery = parseInt(values.pokemonName);
  //     if (isNaN(searchQuery)) {
  //       searchForm.setFieldError(
  //         "pokemonName",
  //         "You know that's not a valid pokemon name or number - are you trying to break the system?"
  //       );
  //       return;
  //     }
  //   }

  //   setSearchQuery(searchQuery);

  //   searchPokemonByNameId(searchQuery)
  //     .then((pokemonData) => {
  //       if (pokemonData) {
  //         setResultItems([pokemonData]);
  //       } else {
  //         setUserAlert(
  //           "Pokemon not found, are you sure it's a pokemon ?",
  //           "error"
  //         );
  //       }
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setUserAlert(
  //         "Pokedex search doesn't seems to be working. Perhaps it went out of battery?",
  //         "error"
  //       );
  //       setLoading(false);
  //     });
  // };

  const handleSwitchSearchType = () => {
    setResultItems([]);
    setSearchMode("type");
  };

  const handleResetSearch = () => {
    // searchForm.reset();
    // searchForm.setValues({ pokemonName: "" });
    setResultItems([]);
    setSearchMode("all");
  };

  return (
    <Card radius={"md"} w={"100%"}>
      {/* <form onSubmit={searchForm.onSubmit(handleSearch)}> */}
      <Flex
        gap={theme.spacing(2)}
        w={"100%"}
        align={"center"}
        justify={"start"}
      >
        <TextInput
          required
          radius={"md"}
          placeholder="Search pokemon by name"
          w={"auto"}
          h={48}
          flex={1}
          // {...searchForm.getInputProps("pokemonName")}
        />
        <Flex align={"center"} gap={theme.spacing(2)}>
          <ActionIcon radius={"md"} type="submit" size={48}>
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
      {/* </form> */}
    </Card>
  );
};
