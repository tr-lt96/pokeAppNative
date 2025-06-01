import { TOKEN_KEY } from "../constants";
import teams from "../_mock/data/teams.json";
import { fetchWithTimeout } from "./utils";

export const getPokemonDataFromPokemonId = async (pokemonNameId) => {
  const result = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonNameId}/`
  );

  const rawJsonData = await result.json();

  if (!rawJsonData) {
    return null;
  }

  return {
    stats: rawJsonData.stats.reduce((acc, stat) => {
      return {
        ...acc,
        [stat.stat.name]: stat.base_stat,
      };
    }, {}),
    size: {
      height: rawJsonData.height,
      weight: rawJsonData.weight,
    },
    abilities: rawJsonData.abilities.map((ability) => ability.ability.name),
    types: rawJsonData.types.map((type) => type.type.name),
    name: rawJsonData.name,
    spriteUrl: rawJsonData.sprites.front_default,
    pokeId: rawJsonData.id,
  };
};

export const getPokemonData = async (pokemonNameId) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return await getPokemonDataFromPokemonId(pokemonNameId);
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/pokemon/?search=${pokemonNameId}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "GET",
      headers,
      timeout: 5000,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const getAllPokemonData = async ({ limit, offset }) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return {
      results: teams[0].pokemons,
      total: teams[0].pokemons.length,
    };
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/pokemon/all?limit=${limit}&offset=${offset}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "GET",
      headers,
      timeout: 5000,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const getPokemonByTypeData = async (type, { limit, offset }) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return {
      results: teams[0].pokemons,
      total: teams[0].pokemons.length,
    };
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/pokemon/type/${type}?limit=${limit}&offset=${offset}`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "GET",
      headers,
    });

    if (!fetchResult?.ok) {
      return null;
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }
      throw new Error(result.error);
    }

    return result;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const searchPokemonByNameId = getPokemonData;
