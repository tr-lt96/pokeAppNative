import {
  Text,
  Container,
  Flex,
  Card,
  useTheme,
  Button,
} from "../../components/shared/core";
import { TeamListItem } from "../../components/team-info/TeamListItem";
import { useUser } from "../../components/auth/context/AuthContext";
import { AddTeamAction } from "../../components/team-info/AddTeamAction";
import { ScreenLayout } from "../ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../constants";

export const TeamListPage = () => {
  const { theme } = useTheme();
  const { teams = [] } = useUser();
  const { navigate } = useNavigation();

  const testTeam = () => {
    navigate(screenNames.team.share._name, { pokemons: "1-2-3-4-5-6" });
  };

  return (
    <ScreenLayout withScrollView>
      <Container w={"100%"} mt={theme.spacing(3)} p={0}>
        <Text variant={"heading-xl-strong"}>Teams</Text>
        <Text mb={theme.spacing(3)}>Every single team, all yours trully! </Text>

        <AddTeamAction />
        <Flex
          w={"100%"}
          direction={"column"}
          gap={theme.spacing(3)}
          mt={theme.spacing(3)}
        >
          {teams.map((team, index) => {
            return <TeamListItem key={`team-${index}`} team={team} />;
          })}
        </Flex>
      </Container>
    </ScreenLayout>
  );
};
