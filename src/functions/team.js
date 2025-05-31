import mockTeams from "../_mock/data/teams.json";
import { TOKEN_KEY } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAllTeams = async () => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return mockTeams;
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams`;
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

    const teamsData = await fetchResult.json();

    if (!teamsData || teamsData.error) {
      return null;
    }

    return teamsData.map((team) => {
      return {
        name: team.name,
        teamId: team["_id"],
        pokemons: team.pokemons || [],
      };
    });
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const getTeamById = async (teamId, teams = []) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    const localResult = teams.find((team) => `${team.teamId}` === `${teamId}`);
    return localResult;
  }

  try {
    const token = (await AsyncStorage.getItem(TOKEN_KEY)) || "";
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams/${teamId}`;
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

    const teamData = await fetchResult?.json();

    return teamData;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const addNewTeam = async (teamName) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return {
      name: teamName,
      teamId: Date.now(),
      pokemons: [],
    };
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams/create`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: teamName,
      }),
    });

    if (fetchResult?.status !== 201) {
      return null;
    }

    const result = await fetchResult?.json();

    return {
      name: result.team.name,
      teamId: result.team["_id"],
      pokemons: [],
    };
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const deleteTeam = async (teamId) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return true;
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams/${teamId}`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "DELETE",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    return result;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const addPokemonToTeam = async (pokemonName, teamId) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return true;
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams/${teamId}/pokemon`;
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({ pokemonName: pokemonName }),
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult.json();

    return result;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const evaluatePokemonTeam = async (teamId) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return null;
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/teams/${teamId}/evaluation`;
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

    const teamEvaluationData = await fetchResult?.json();

    if (!teamEvaluationData) {
      return null;
    }

    return {
      team: teamEvaluationData.name,
      strongChart: teamEvaluationData.strongChart,
      weakChart: teamEvaluationData.weakChart,
    };
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};
