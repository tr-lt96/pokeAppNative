import {
  Text,
  Container,
  Flex,
  Card,
  useTheme,
  Button,
  useMessage,
} from "../../components/shared/core";
import { TeamListItem } from "../../components/team-info/TeamListItem";
import { useUser } from "../../components/auth/context/AuthContext";
import { AddTeamAction } from "../../components/team-info/AddTeamAction";
import { ScreenLayout } from "../ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../constants";
import { useCameraPermission } from "react-native-vision-camera";

export const TeamListPage = () => {
  const { theme } = useTheme();
  const { teams = [] } = useUser();
  const { navigate } = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const { setUserAlert } = useMessage();

  const handleNavigateToCameraPage = async () => {
    let allowPermission = hasPermission;
    if (!allowPermission) {
      allowPermission = await requestPermission();
    }

    if (allowPermission) {
      // navigate to camera page
      navigate(screenNames.team.scan._name);
    } else {
      setUserAlert("Camera should be allowed to copy team", "warning");
    }
  };

  return (
    <ScreenLayout withScrollView>
      <Container w={"100%"} mt={theme.spacing(3)} p={0}>
        <Text variant={"heading-xl-strong"}>Teams</Text>
        <Text mb={theme.spacing(3)}>Every single team, all yours trully! </Text>
        <Flex gap={theme.spacing(3)}>
          <AddTeamAction />
          <Button
            radius={"md"}
            color={"grape"}
            variant={"light"}
            onPress={handleNavigateToCameraPage}
          >
            Copy a team
          </Button>
        </Flex>
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
