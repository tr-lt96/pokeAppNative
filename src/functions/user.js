import { TOKEN_KEY } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return {
      username: "Ash-ketchum",
      email: "ash@kanto.town",
    };
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/auth/userInformation`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const userData = await fetchResult.json();

    if (!userData) {
      return null;
    }

    return {
      username: userData.user.username,
      email: userData.user.email,
      teams: userData.teams.map((team) => {
        return {
          name: team.name,
          teamId: team["_id"],
          pokemons: team.pokemons || [],
        };
      }),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
