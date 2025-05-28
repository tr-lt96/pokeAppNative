import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginPage } from "./src/pages/auth/LoginPage";
import { RegisterPage } from "./src/pages/auth/RegisterPage";
import { capitalise } from "./src/functions/utils";
import { PokemonSearchPage } from "./src/pages/search/PokemonSearchPage";
import { PokemonInfoPage } from "./src/pages/pokemon-info/PokemonInfoPage";
import { TeamListPage } from "./src/pages/team-info/TeamListPage";
import { TeamInfoPage } from "./src/pages/team-info/TeamInfoPage";
import { screenNames } from "./src/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, useTheme } from "./src/components/shared/core";
import { UserPage } from "./src/pages/user/UserPage";
import { useUser } from "./src/components/auth/context/AuthContext";
import * as Linking from "expo-linking";
import { TeamSharePage } from "./src/pages/team-info/TeamSharePage";

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const TeamsStack = createNativeStackNavigator();

const SearchNavigationStack = () => {
  return (
    <SearchStack.Navigator initialRouteName={screenNames.pokemon.search._name}>
      <SearchStack.Screen
        name={screenNames.pokemon.search._name}
        component={PokemonSearchPage}
        options={{
          title: "Search Pokemon",
        }}
      />
      <SearchStack.Screen
        name={screenNames.pokemon.info._name}
        component={PokemonInfoPage}
        options={({ route }) => ({
          title: `${capitalise(route.params.pokemonName)} Info`,
        })}
      />
    </SearchStack.Navigator>
  );
};

const TeamsNavigationStack = () => {
  return (
    <TeamsStack.Navigator initialRouteName={screenNames.team.list._name}>
      <TeamsStack.Screen
        name={screenNames.team.list._name}
        component={TeamListPage}
      />
      <TeamsStack.Screen
        name={screenNames.team.info._name}
        component={TeamInfoPage}
        options={{
          title: "Team Info",
        }}
      />
      <TeamsStack.Screen
        name={screenNames.team.share._name}
        component={TeamSharePage}
        options={{
          title: "Sharing is caring",
        }}
      />
      <TeamsStack.Screen
        name={screenNames.pokemon.info._name}
        component={PokemonInfoPage}
        options={({ route }) => ({
          title: `${capitalise(route.params.pokemonName)} Info`,
        })}
      />
    </TeamsStack.Navigator>
  );
};

const TabBarIcon = ({ name, focused }) => {
  const { theme } = useTheme();

  return (
    <MaterialIcons
      name={name}
      size={24}
      color={focused ? theme.colors.primary : theme.colors.gray[5]}
    />
  );
};

const TabBarLabel = ({ children, focused }) => {
  const textColor = focused ? "primary" : "gray.5";

  return (
    <Text variant="body-sm" c={textColor}>
      {children}
    </Text>
  );
};

const NavigationTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenNames.pokemon._name}
      screenOptions={{ animation: "shift" }}
    >
      <Tab.Screen
        name={screenNames.pokemon._name}
        component={SearchNavigationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="search" focused={focused} />
          ),
          tabBarLabel: (props) => <TabBarLabel {...props} />,
        }}
      />
      <Tab.Screen
        name={screenNames.team._name}
        component={TeamsNavigationStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="workspaces" focused={focused} />
          ),
          tabBarLabel: (props) => <TabBarLabel {...props} />,
        }}
      />
      <Tab.Screen
        name={screenNames.user._name}
        component={UserPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="person" focused={focused} />
          ),
          tabBarLabel: (props) => <TabBarLabel {...props} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppRouter = () => {
  const { isAuth } = useUser();
  const deepLinkEndpoint = process.env.EXPO_PUBLIC_UNIVERSAL || "";
  const linking = {
    prefixes: [prefix, deepLinkEndpoint].filter((prefix) => !!prefix),
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        {isAuth ? (
          // Home application
          <Stack.Screen
            name={screenNames.home._name}
            component={NavigationTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/* Auth */}
            <Stack.Screen
              name={screenNames.login._name}
              component={LoginPage}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name={screenNames.register._name}
              component={RegisterPage}
              options={{ headerBackVisible: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
