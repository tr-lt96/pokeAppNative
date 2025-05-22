import { TeamMemberSpriteDisplay } from "../shared/team";
import {
  Text,
  useMessage,
  useTheme,
  Flex,
  Card,
  ActionIcon,
} from "../shared/core";
import { useNavigation } from "@react-navigation/native";
import { deleteTeam } from "../../functions/team";
import { useUser } from "../auth/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { screenNames } from "../../constants";

export const TeamListItem = ({ team = {} }) => {
  const { theme } = useTheme();
  const { name = "Unown", pokemons = [], teamId } = team;
  const { navigate } = useNavigation();
  const { setUserAlert } = useMessage();
  const { deleteTeam: deleteTeamFromContext } = useUser();
  const { width } = useWindowDimensions();
  const spriteWidth = width / 2 - theme.spacing(8);

  const handleView = () => {
    if (!teamId) {
      return;
    }

    navigate(screenNames.teamInfo, {
      teamId,
    });
  };

  const handleRemove = async () => {
    deleteTeam(teamId).then((result) => {
      if (result) {
        setUserAlert(`Bye team ${name} 👋`, "success");
        deleteTeamFromContext(teamId);
      } else {
        setUserAlert(
          "Trouble removing team, team doesn't want to leave you :(",
          "error"
        );
      }
    });
  };

  return (
    <Card flex={1} w={"100%"} pb={theme.spacing(4)}>
      <Flex
        align={"center"}
        mb={theme.spacing(3)}
        gap={theme.spacing(1)}
        justify={"space-between"}
      >
        <Text variant="label-lg-strong">{name}</Text>
        <Flex gap={theme.spacing(3)}>
          <ActionIcon
            color="red"
            variant="light"
            size={40}
            onPress={handleRemove}
          >
            <MaterialIcons name={"delete"} size={16} />
          </ActionIcon>
          <ActionIcon variant="light" size={40} onPress={handleView}>
            <MaterialIcons name={"visibility"} size={16} />
          </ActionIcon>
        </Flex>
      </Flex>
      <Flex justify={"start"} gap={theme.spacing(1)} wrap={"wrap"}>
        {pokemons.map((pokemon, index) => (
          <TeamMemberSpriteDisplay
            key={`${name}-pokemon-${index}`}
            pokemon={pokemon}
            teamName={name}
            w={spriteWidth}
          />
        ))}
      </Flex>
    </Card>
  );
};
