import {
  PokemonAbilitesInfoCard,
  PokemonSizeInfoCard,
  PokemonSpriteDisplay,
  PokemonStatsInfoCard,
  PokemonTypeInfoCard,
} from "./PokemonAttributeInfo";
import { getPokemonDisplayName } from "../../functions/utils";
import { PokeIdBadge } from "../shared/info";
import { Button, Container, Flex, useTheme, Text } from "../shared/core";

export const PokemonInfo = ({ pokemonData = {}, loading, handleAddToTeam }) => {
  const { theme } = useTheme();
  const {
    stats,
    size,
    abilities = [],
    types = [],
    name = "unkown",
    spriteUrl = "",
    pokeId,
  } = pokemonData;

  const displayName = getPokemonDisplayName(name);

  return (
    <Container w={"100%"} mt={theme.spacing(3)} mb={theme.spacing(12)}>
      <Flex w={"100%"} direction={"column"} gap={theme.spacing(3)}>
        <Flex w={"100%"} justify={"space-between"} align={"flex-end"}>
          {/* Display Pokemon name and pokemon ID i.e. #025 */}

          {/* <Skeleton visible={loading} w={"fit-content"}> */}
          <Button radius={"md"} onClick={handleAddToTeam}>
            {"Add to your gang(s)"}
          </Button>
          {/* </Skeleton> */}
        </Flex>

        {/* <Skeleton visible={loading}> */}
        <Container w={"100%"} pos={"relative"}>
          <Container
            pos={"absolute"}
            left={theme.spacing(2)}
            top={theme.spacing(2)}
            style={{ zIndex: 20 }}
          >
            <Flex align={"center"} gap={4} wrap={"wrap"}>
              <Text variant={"heading-lg-strong"}>{displayName}</Text>
              <PokeIdBadge pokeId={pokeId} />
            </Flex>
          </Container>
          <PokemonSpriteDisplay spriteUrl={spriteUrl} />
        </Container>
        {/* </Skeleton> */}

        {/* <Skeleton visible={loading}> */}
        <Flex gap={theme.spacing(3)}>
          <PokemonTypeInfoCard types={types} />
          {size?.weight && size?.height && (
            <PokemonSizeInfoCard weight={size.weight} height={size.height} />
          )}
        </Flex>
        {/* </Skeleton> */}

        {/* <Skeleton visible={loading}> */}
        {abilities?.length ? (
          <PokemonAbilitesInfoCard abilities={abilities} />
        ) : null}
        {/* </Skeleton> */}

        {/* <Skeleton visible={loading}> */}
        <PokemonStatsInfoCard stats={stats} />
        {/* </Skeleton> */}
      </Flex>
    </Container>
  );
};
