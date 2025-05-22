import {
  Text,
  Badge,
  Card,
  Container,
  Flex,
  Progress,
  Image,
  useTheme,
} from "../shared/core";
import { TypeInfo } from "../shared/info";

export const PokemonTypeInfoCard = ({ types }) => {
  const { theme } = useTheme();
  return (
    <Card radius={"md"} w={"100%"}>
      <Text variant="label-md-strong" mb={theme.spacing(2)}>
        Type
      </Text>
      <TypeInfo types={types} keyID={"pokemon"} wrap />
    </Card>
  );
};

export const PokemonSizeInfoCard = ({ height, weight }) => {
  const displayInfo = `${height / 10}m / ${weight / 10}kg`;
  const { theme } = useTheme();

  return (
    <Card radius={"md"} w={"100%"}>
      <Text variant="label-md-strong" mb={theme.spacing(2)}>
        Height/Weight
      </Text>
      <Text>{displayInfo}</Text>
    </Card>
  );
};

export const PokemonAbilitesInfoCard = ({ abilities }) => {
  const { theme } = useTheme();

  if (!abilities?.length) {
    return null;
  }

  return (
    <Card radius={"md"} w={"100%"}>
      <Text variant="label-md-strong" mb={theme.spacing(2)}>
        Abilities
      </Text>
      <Flex gap={6} wrap={"wrap"}>
        {abilities.map((ability, index) => (
          <Badge key={`pokemon-${index}-${ability}`} size="sm" radius={"sm"}>
            {ability}
          </Badge>
        ))}
      </Flex>
    </Card>
  );
};

const STAT_LABEL_MAP = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  specialAttack: "Sp. Attack",
  specialDefense: "Sp. Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

const STAT_COLOR_MAP = {
  hp: "green.4",
  attack: "yellow.4",
  defense: "orange.5",
  specialAttack: "cyan.4",
  specialDefense: "indigo.4",
  "special-attack": "cyan.4",
  "special-defense": "indigo.4",
  speed: "pink.4",
};

const StatDisplay = ({ label, value = 0 }) => {
  const displayLabel = STAT_LABEL_MAP[label] || label;
  const progressValue = (value / 255) * 100;
  return (
    <Container w={"100%"} p={0}>
      <Flex justify={"space-between"}>
        <Text variant={"label-md"} mb={4}>
          {displayLabel}
        </Text>
        <Text variant={"label-md"}>{`${value}`}</Text>
      </Flex>
      <Progress
        w={"100%"}
        color={STAT_COLOR_MAP[label]}
        value={progressValue}
      />
    </Container>
  );
};

export const PokemonStatsInfoCard = ({ stats }) => {
  const { theme } = useTheme();

  if (!stats) {
    return null;
  }

  return (
    <Card radius={"md"} w={"100%"} shadow={"md"}>
      <Text variant="label-md-strong" mb={theme.spacing(2)}>
        Base stats
      </Text>
      <Flex direction={"column"} rowGap={6}>
        {Object.keys(stats).map((stat, index) => (
          <StatDisplay
            key={`${stat}-${index}`}
            label={stat}
            value={stats[stat]}
          />
        ))}
      </Flex>
    </Card>
  );
};

export const PokemonSpriteDisplay = ({ spriteUrl }) => {
  const { theme } = useTheme();
  return (
    <Card radius={"md"} w={"100%"}>
      <Flex justify={"center"} w={"100%"} align={"center"}>
        {spriteUrl ? <Image uriSrc={spriteUrl} h={200} w={200} /> : null}
      </Flex>
    </Card>
  );
};
