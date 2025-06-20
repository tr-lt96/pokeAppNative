// import { Anchor, Card, Flex, Image, useMatches } from "@mantine/core";
import { Text, Card, Flex, Image, useTheme, Container } from "../core";
import { TypeInfo } from "./TypeInfo";
import { PokeIdBadge } from "./PokeIdBadge";
import { getPokemonDisplayName } from "../../../functions/utils";
import { Link } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { useMemo } from "react";
import { screenNames } from "../../../constants";

/**
 * @typedef {{
 * name: string,
 * pokeId: number,
 * spriteUrl: string,
 * types: string[],
 * }} IPokemonInfoCard
 *
 * @param {IPokemonInfoCard} props
 */
export const PokemonInfoCard = ({
  name,
  pokeId,
  spriteUrl,
  types = [],
  resultId,
}) => {
  const { theme } = useTheme();
  const displayName = getPokemonDisplayName(name);
  const { width } = useWindowDimensions();
  const calculatedWidth = useMemo(() => width / 2 - theme.spacing(8), [width]);

  return (
    <Container w={calculatedWidth}>
      <Link
        screen={screenNames.pokemon.info._name}
        params={{ pokemonName: name }}
      >
        <Card flex={1} radius={"md"} w={"100%"} h={"100%"}>
          <Flex direction={"row-reverse"} w={"100%"}>
            <PokeIdBadge pokeId={pokeId} />
          </Flex>
          <Flex w={"100%"} justify={"center"} py={theme.spacing(2)}>
            <Image
              uriSrc={spriteUrl}
              w={100}
              h={80}
              maw={200}
              mah={200}
              alt={`${name}-sprite`}
            />
          </Flex>
          <Text variant={"label-lg-strong"} py={theme.spacing(2)}>
            {displayName}
          </Text>
          <TypeInfo types={types} keyID={resultId} wrap size="sm" />
        </Card>
      </Link>
    </Container>
  );
};
