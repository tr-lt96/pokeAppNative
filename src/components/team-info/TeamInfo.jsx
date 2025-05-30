import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Share from "react-native-share";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import { screenNames } from "../../constants";
import {
  Text,
  Button,
  Container,
  Flex,
  useTheme,
  ActionIcon,
  useMessage,
  Modal,
} from "../shared/core";
import { PokemonInfoCard } from "../shared/info";

const TeamQRCode = ({ qrString }) => {
  const { theme } = useTheme();
  return (
    <Flex w={"100%"} justify={"center"}>
      <QRCode
        value={qrString}
        size={200}
        color={theme.colors.primary}
        backgroundColor={theme.colors.white}
      />
    </Flex>
  );
};

export const TeamInfo = ({ team }) => {
  const { theme } = useTheme();
  const { name = "Unown", pokemons = [] } = team;
  const { navigate } = useNavigation();
  const { setUserAlert } = useMessage();
  const [openShareModal, setOpenShareModal] = useState(false);
  const [isSharingByImage, setIsSharingByImage] = useState(false);
  const teamInfoRef = useRef(null);
  const teamString = useMemo(
    () => pokemons.map(({ pokeId }) => pokeId).join("-"),
    []
  );

  const handleToSearch = () => {
    navigate(screenNames.pokemon.search._name);
  };

  const handleShareLink = async () => {
    try {
      const getShareEncoded = pokemons
        .map((pokemon) => pokemon.pokeId)
        .join("-");
      const shareURL = `poketeam://Home/Team/TeamShare?pokemons=${getShareEncoded}`;

      const shareResult = await Share.open({
        title: `Share team ${name} to your friends`,
        url: shareURL,
      });

      if (shareResult.success) {
        setUserAlert("Successfully shared", "success");
      }
    } catch (error) {
      if (error?.message !== "User did not share") {
        console.error(error);
        setUserAlert(
          "Oops, this team is being shy, can you try again?",
          "error"
        );
      }
    }
  };

  const handlerShareQR = () => {
    // Ensuring component has mounted as expected
    setTimeout(async () => {
      if (teamInfoRef.current) {
        try {
          const uri = await teamInfoRef.current.capture();
          const shareOptions = {
            title: "Share QR Code",
            url: uri,
            type: "image/jpg",
          };
          const shareResult = await Share.open(shareOptions);

          if (shareResult.success) {
            setUserAlert("Successfully shared", "success");
            setIsSharingByImage(false);
          }
        } catch (error) {
          if (error?.message !== "User did not share") {
            console.error(error);
            setUserAlert(
              "Oops, this team is being shy, can you try again?",
              "error"
            );
          }
          setIsSharingByImage(false);
        }
      }
    }, 1500);
  };

  useEffect(() => {
    if (isSharingByImage) {
      handlerShareQR();
    }
  }, [isSharingByImage]);

  return (
    <Container w={"100%"} p={0}>
      <Flex w={"100%"} justify={"space-between"}>
        <Container>
          <Text variant="heading-xl-strong">{name}</Text>
          <Text>Where your team is judged!</Text>
        </Container>

        <ActionIcon
          radius={"md"}
          size={48}
          variant="light"
          color="pink"
          onPress={() => setOpenShareModal(true)}
        >
          <MaterialIcons name={"share"} size={16} />
        </ActionIcon>
        <Modal
          title={"Share options"}
          opened={openShareModal}
          onClose={() => setOpenShareModal(false)}
          w={"80%"}
        >
          <Container m={theme.spacing(3)}>
            <Flex
              mt={theme.spacing(3)}
              gap={theme.spacing(3)}
              justify={"center"}
              align={"center"}
              wrap={"wrap"}
            >
              <Button w={"100%"} variant="light" onPress={handleShareLink}>
                Share Link
              </Button>
              <Button w={"100%"} onPress={() => setIsSharingByImage(true)}>
                Share QR
              </Button>
            </Flex>
          </Container>
        </Modal>
      </Flex>

      <Container w={"100%"} p={0} mt={theme.spacing(3)}>
        {!isSharingByImage && pokemons.length < 6 && (
          <Button radius={"md"} onPress={handleToSearch}>
            Add more pokemons?
          </Button>
        )}
        <ViewShot
          ref={teamInfoRef}
          options={{ format: "jpg", quality: 1 }}
          style={{ width: "100%", padding: theme.spacing(2) }}
        >
          {isSharingByImage && (
            <TeamQRCode qrString={`poketeam-${teamString}`} />
          )}
          <Flex
            direction={"row"}
            gap={theme.spacing(3)}
            wrap={"wrap"}
            mt={theme.spacing(3)}
          >
            {pokemons.map((pokemonData, index) => (
              <PokemonInfoCard
                key={`pokemonInfo-${index}`}
                resultId={`pokemonInfo-${index}`}
                {...pokemonData}
              />
            ))}
          </Flex>
        </ViewShot>
      </Container>
    </Container>
  );
};
