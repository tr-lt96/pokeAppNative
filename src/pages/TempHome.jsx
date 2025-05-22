import { Badge, Button, useTheme, Flex, Chip } from "../components/shared/core";
import { PasswordInput } from "../components/shared/core/atoms/fields/PasswordInput";
import { View, StyleSheet } from "react-native";
import { Text } from "../components/shared/core";
import { StatusBar } from "expo-status-bar";
import { ScreenLayout } from "./ScreenLayout";
import { useNavigation } from "@react-navigation/native";
import {
  PokeIdBadge,
  PokemonInfoCard,
  TypeBadge,
} from "../components/shared/info";

const testPokemons = [
  {
    name: "pikachu",
    pokeId: 25,
    types: ["electric", "steel"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    name: "poliwag",
    pokeId: 60,
    types: ["water"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png",
  },
  {
    name: "beedrill",
    pokeId: 15,
    types: ["flying", "bug"],
    spriteUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png",
  },
];

const TestComponent = () => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();
  return (
    <>
      <Button
        onPress={() => {
          navigate("Register");
        }}
      >
        Navigate to register
      </Button>
      <Button
        onPress={() => {
          navigate("Search");
        }}
      >
        Navigate to pokeSearch
      </Button>
      <Button
        onPress={() => {
          navigate("Team");
        }}
      >
        Navigate to teamlist
      </Button>
    </>
  );
};

export const TempHome = () => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={{ fontSize: 14 }}>
          Open up App.js to start working on your app!
        </Text>
        <TestComponent />
        <StatusBar style="auto" />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
  },
});

// icons
// IconCirclesFilled,
//   IconUserFilled,
// IconPlus, IconEye
// IconSearch, IconCategoryFilled, IconX
// IconMoodConfuzedFilled,
//   IconMoodSmileFilled,
//   IconMoodWrrrFilled,
// IconTrash
// IconCircleFilled

//core

// ActionIcon, done
// Button (done),
// Flex (done)
// // Container (done)

// TextInput, (done)
// PasswordInput, (done)

// Anchor, - should be same as button link ?
// Badge,
// Card, (done)
// Image,

// Skeleton <- optional
// useMatches <- only use xs
// ActionIcon, done
// Drawer
// Chip,
// Affix,
// Alert
// Modal
// Rating
// Progress
