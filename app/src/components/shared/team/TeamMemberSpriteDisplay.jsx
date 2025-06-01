import { Text, Container, Flex, Image, useTheme } from "../core";
import { TypeInfo } from "../info";
import { getPokemonDisplayName } from "../../../functions/utils";

export const TeamMemberSpriteDisplay = ({
  pokemon,
  teamName,
  ...containerProps
}) => {
  const { theme } = useTheme();
  const { name = "Unown", spriteUrl, types } = pokemon;
  const displayName = getPokemonDisplayName(name);
  const typeKeyID = teamName.split(" ").join("-");

  return (
    <Container {...containerProps}>
      <Flex
        direction={"column"}
        justify={"center"}
        align={"center"}
        gap={theme.spacing(1)}
      >
        <Image uriSrc={spriteUrl} w={60} h={60} />
        <Text variant={"label-md"}>{displayName}</Text>
        <TypeInfo
          types={types}
          keyID={typeKeyID}
          size={"sm"}
          wrap
          style={{ justifyContent: "center" }}
        />
      </Flex>
    </Container>
  );
};
