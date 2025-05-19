// import { Anchor, Card, Flex, Image, useMatches } from "@mantine/core";
import { Text, Card, Flex, Image, useTheme, Container } from "../core";
import { TypeInfo } from "./TypeInfo";
import { PokeIdBadge } from "./PokeIdBadge";
import { getPokemonDisplayName } from "../../../functions/utils";
import { Link } from "@react-navigation/native";

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

  return (
    <Container w={"50%"} h={"100%"} px={theme.spacing(1)}>
      <Link screen={"PokemonInfo"} params={{ pokemonName: name }}>
        <Card flex={1} radius={"md"} w={"100%"} h={"100%"}>
          <Flex direction={"row-reverse"} w={"100%"}>
            <PokeIdBadge pokeId={pokeId} />
          </Flex>
          <Flex w={"100%"} justify={"center"} py={theme.spacing(2)}>
            <Image
              uriSrc={spriteUrl}
              miw={80}
              maw={200}
              mih={80}
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
