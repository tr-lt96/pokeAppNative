import { TeamInfo } from "../../components/team-info/TeamInfo";
import { TeamTypeAnalysis } from "../../components/team-info/TeamTypeAnalysis";
import { useEffect, useState } from "react";
import { getTeamById } from "../../functions/team";
import {
  useMessage,
  Container,
  Flex,
  useTheme,
} from "../../components/shared/core";
import { useUser } from "../../components/auth/context/AuthContext";
import { useRoute } from "@react-navigation/native";
import { ScreenLayout } from "../ScreenLayout";

export const TeamInfoPage = () => {
  const { theme } = useTheme();
  const { params = {} } = useRoute();
  const { teamId } = params;
  const { teams } = useUser();
  const [team, setTeam] = useState();
  const { setUserAlert } = useMessage();

  useEffect(() => {
    if (!teamId) {
      return;
    }

    getTeamById(teamId, teams)
      .then((teamData) => {
        setUserAlert("Successful fetching team data", "success");
        setTeam(teamData);
      })
      .catch((error) => {
        setUserAlert("Error while fetching team data", "error");
        console.error(error);
      });
  }, []);

  if (!team) {
    return null;
  }
  return (
    <ScreenLayout withScrollView>
      <Container w={"100%"} mt={theme.spacing(3)} mb={theme.spacing(6)}>
        <Flex direction={"column"} gap={theme.spacing(3)}>
          <TeamInfo team={team} />
          <TeamTypeAnalysis teamPokemons={team.pokemons} teamId={teamId} />
        </Flex>
      </Container>
    </ScreenLayout>
  );
};
