import { useEffect, useState } from "react";
import { TypeBadge } from "../shared/info";
import { getThemeTokenFromColor } from "../../functions/theme";
import { Text, useTheme, Card, Container, Flex, Rating } from "../shared/core";
import { evaluatePokemonTeam } from "../../functions/team";
import { useWindowDimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const CHART_COLOR = {
  weak: "red.5",
  strong: "indigo.5",
};

const TypeAnalysisInfo = ({ type, chartValue, chartType }) => {
  const { theme } = useTheme();
  const ratingColor = getThemeTokenFromColor(CHART_COLOR[chartType], theme);
  const emptyColor = getThemeTokenFromColor("gray.4", theme);
  const { width } = useWindowDimensions();
  const statWidth = width / 3 - theme.spacing(8);

  return (
    <Container w={statWidth}>
      <TypeBadge variant={type} size="sm" />
      <Rating
        mt={theme.spacing(2)}
        count={6}
        emptySymbol={
          <MaterialIcons color={emptyColor} name={"circle"} size={10} />
        }
        fullSymbol={
          <MaterialIcons color={ratingColor} name={"circle"} size={10} />
        }
        value={chartValue}
        keyID={chartType}
      />
    </Container>
  );
};

const TypeAnalysisChartInfo = ({ chart = {}, chartType }) => {
  const { theme } = useTheme();
  const displayLabel = chartType === "weak" ? "Weak" : "Strong";
  return (
    <Container p={0}>
      <Text
        c={CHART_COLOR[chartType]}
        variant={"heading-md-strong"}
        mt={theme.spacing(4)}
      >
        {displayLabel}
      </Text>
      <Flex wrap={"wrap"} gap={theme.spacing(2)} mt={theme.spacing(2)}>
        {Object.keys(chart).map((type) => {
          return (
            <TypeAnalysisInfo
              key={`${chartType}-${type}`}
              type={type}
              chartValue={chart[type]}
              chartType={chartType}
            />
          );
        })}
      </Flex>
    </Container>
  );
};

export const TeamTypeAnalysis = ({ teamPokemons, teamId }) => {
  const [weakChart, setWeakChart] = useState();
  const [strongChart, setStrongChart] = useState();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    if (teamPokemons.length) {
      evaluatePokemonTeam(teamId)
        .then((result) => {
          if (!result) {
            setErrorMsg(
              "Oopsie, we made some mistake and things are crashing. Time for a refresh!"
            );
          } else {
            setWeakChart(result.weakChart);
            setStrongChart(result.strongChart);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.warn(error);
          setErrorMsg(
            "Oopsie, we made some mistake and things are crashing. Time for a refresh!"
          );
          setLoading(false);
        });
    } else {
      setLoading(false);
      setErrorMsg(
        "Maybe there's nothing to analyse at all - or our Analyser has been going on holiday. They've worked hard!"
      );
    }
  }, []);

  if (loading) {
    return null;
  }

  return (
    // <Skeleton visible={loading} w={"100%"}>
    <Card w={"100%"}>
      <Text variant={"heading-lg-strong"} mb={"md"}>
        Analysis chart
      </Text>
      {teamPokemons.length > 0 && (weakChart || strongChart) && (
        <Container p={0}>
          <Flex direction={"column"} gap={"md"}>
            <TypeAnalysisChartInfo chart={weakChart} chartType={"weak"} />
            <TypeAnalysisChartInfo chart={strongChart} chartType={"strong"} />
          </Flex>
        </Container>
      )}
      <Text>{errorMsg}</Text>
    </Card>
    // </Skeleton>
  );
};
