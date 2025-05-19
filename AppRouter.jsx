import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TempHome } from "./src/pages/TempHome";
import { LoginPage } from "./src/pages/auth/LoginPage";
import { RegisterPage } from "./src/pages/auth/RegisterPage";
import { View, Text } from "react-native";
import { capitalise } from "./src/functions/utils";

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        {/* To be removed */}
        <Stack.Screen name="Home" component={TempHome} />
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen
          name="PokemonSearch"
          component={TempHome}
          options={{
            title: "Search Pokemon",
          }}
        />
        <Stack.Screen
          name="PokemonInfo"
          component={TempHome}
          options={({ route }) => ({
            title: `${capitalise(route.params.pokemonName)} Info`,
          })}
        />
        <Stack.Screen name="Teams" component={TempHome} />
        <Stack.Screen
          name="TeamInfo"
          component={TempHome}
          options={{
            title: "Team Info",
          }}
        />
        <Stack.Screen name="User" component={TempHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
