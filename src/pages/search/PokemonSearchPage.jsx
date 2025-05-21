import { SearchBar } from "../../components/search/SearchBar";
import { Container, Flex, useTheme } from "../../components/shared/core";
import {
  PokemonSearchProvider,
  usePokemonSearchContext,
} from "../../components/search/context/PokemonSearchContext";
import { SearchTypeBar } from "../../components/search/SearchTypeBar";
import { PokemonSearchResults } from "../../components/search/PokemonSearchResults";
import { ScreenLayout } from "../ScreenLayout";

const SearchBars = () => {
  const { searchMode } = usePokemonSearchContext();
  return (
    <>
      {searchMode !== "type" ? <SearchBar /> : null}
      {searchMode === "type" ? <SearchTypeBar /> : null}
    </>
  );
};

export const PokemonSearchPage = () => {
  const { theme } = useTheme();
  return (
    <PokemonSearchProvider>
      <Container w={"100%"} p={theme.spacing(2)}>
        <SearchBars />
      </Container>
      <Flex
        my={theme.spacing(2)}
        direction={"column"}
        gap={theme.spacing(4)}
        w={"100%"}
        flex={1}
      >
        <ScreenLayout>
          <PokemonSearchResults />
        </ScreenLayout>
      </Flex>
    </PokemonSearchProvider>
  );
};
