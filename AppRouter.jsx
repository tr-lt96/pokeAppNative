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

const prefix = Linking.createURL("/");

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const SearchStack = createNativeStackNavigator();
const TeamsStack = createNativeStackNavigator();

const SearchNavigationStack = () => {
  return (
    <SearchStack.Navigator initialRouteName={screenNames.pokemonSearch}>
      <SearchStack.Screen
        name={screenNames.pokemonSearch}
        component={PokemonSearchPage}
        options={{
          title: "Search Pokemon",
        }}
      />
      <SearchStack.Screen
        name={screenNames.pokemonInfo}
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
    <TeamsStack.Navigator initialRouteName={screenNames.teamList}>
      <TeamsStack.Screen name={screenNames.teamList} component={TeamListPage} />
      <TeamsStack.Screen
        name={screenNames.teamInfo}
        component={TeamInfoPage}
        options={{
          title: "Team Info",
        }}
      />
      <TeamsStack.Screen
        name={screenNames.pokemonInfo}
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
      initialRouteName={"Search"}
      screenOptions={{ animation: "shift" }}
    >
      <Tab.Screen
        name={"Search"}
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
        name={"Team"}
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
        name={screenNames.user}
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
  const linking = {
    prefixes: [prefix],
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ gestureEnabled: false }}>
        {isAuth ? (
          // Home application
          <Stack.Screen
            name={screenNames.home}
            component={NavigationTabs}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            {/* Auth */}
            <Stack.Screen
              name={screenNames.login}
              component={LoginPage}
              options={{ headerBackVisible: false }}
            />
            <Stack.Screen
              name={screenNames.register}
              component={RegisterPage}
              options={{ headerBackVisible: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
