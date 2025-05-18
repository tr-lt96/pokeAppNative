import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TempHome } from "./src/pages/TempHome";

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator>
        {/* To be removed */}
        <Stack.Screen name="Home" component={TempHome} />
        <Stack.Screen name="Login" component={TempHome} />
        <Stack.Screen name="Register" component={TempHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export const AppRouter = () => {
//   return (
//     <Routes>
//       <Route element={<PageLayout />}>
//         <Route element={<AuthLayout />}>
//           <Route path="login" element={<LoginPage />} />
//           <Route path="register" element={<RegisterPage />} />
//         </Route>
//         <Route index element={<HomePage />} />
//         <Route path="pokemon">
//           <Route path="search" element={<PokemonSearchPage />} />
//           <Route path=":pokemonName" element={<PokemonInfoPage />} />
//         </Route>
//         <Route path="team">
//           <Route index element={<TeamListPage />} />
//           <Route path=":teamId" element={<TeamInfoPage />} />
//         </Route>
//         <Route path="user" element={<UserPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Route>
//     </Routes>
//   );
// };
