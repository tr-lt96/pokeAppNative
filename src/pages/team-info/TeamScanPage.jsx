import {
  useCameraDevice,
  useCameraPermission,
  Camera,
  useCodeScanner,
} from "react-native-vision-camera";
import {
  Text,
  useTheme,
  Flex,
  Card,
  useMessage,
  Modal,
  Button,
  Container,
} from "../../components/shared/core";
import { ScreenLayout } from "../ScreenLayout";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { screenNames } from "../../constants";

const NoDeviceMessage = () => {
  return (
    <Flex w={"100%"} px={theme.spacing(3)}>
      <Card w={"100%"} bgc={"red"}>
        <Text variant="body-md-strong" c="white">
          Oops
        </Text>
        <Text mt={theme.spacing(2)} c={"white"}>
          Seems like there's no device that can be used to scan.
        </Text>
      </Card>
    </Flex>
  );
};

export const TeamScanPage = () => {
  const { theme } = useTheme();
  const device = useCameraDevice("back");
  const { hasPermission } = useCameraPermission();
  const [scanning, setScanning] = useState(true);
  const { navigate } = useNavigation();
  const { setUserAlert } = useMessage();
  const [openRetryModal, setOpenRetryModal] = useState(false);

  const scanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      setScanning(false);

      const scannedCode = codes?.[0]?.value;

      if (!scannedCode) {
        setOpenRetryModal(true);
      } else {
        if (scannedCode.startsWith("poketeam-")) {
          const sanitisedCode = scannedCode.replace("poketeam-", "");
          navigate(screenNames.team.share._name, { pokemons: sanitisedCode });
        } else {
          setOpenRetryModal(true);
        }
      }
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      setUserAlert("Allow camera permission first !", "error");
      navigate(screenNames.team.list._name);
    }
  }, []);

  if (!hasPermission) {
    return (
      <ScreenLayout>
        <Text>Back to previous screen</Text>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <Container
        mt={theme.spacing(3)}
        px={theme.spacing(4)}
        flex={1}
        w={"100%"}
      >
        <Text variant={"heading-xl-strong"}>Team Scan</Text>
        <Text mb={theme.spacing(3)}>
          Use Camera to scan PokeTeam team QR code
        </Text>
        <Modal title={"Failed. Retry?"} opened={openRetryModal} w={"80%"}>
          <Container m={theme.spacing(3)}>
            <Text>Failed to scan QRcode or the code is not valid.</Text>
            <Flex
              mt={theme.spacing(3)}
              gap={theme.spacing(3)}
              justify={"center"}
              align={"center"}
            >
              <Button
                w={100}
                variant="light"
                onPress={() => {
                  setOpenRetryModal(false);
                  navigate(screenNames.team.list._name);
                }}
              >
                Nah
              </Button>
              <Button
                w={100}
                onPress={() => {
                  setScanning(true);
                  setOpenRetryModal(false);
                }}
              >
                Yeah
              </Button>
            </Flex>
          </Container>
        </Modal>
        {device ? (
          <Camera
            device={device}
            isActive={scanning}
            codeScanner={scanner}
            style={{ height: 500 }}
          ></Camera>
        ) : (
          <NoDeviceMessage />
        )}
      </Container>
    </ScreenLayout>
  );
};
