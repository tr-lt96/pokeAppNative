import { POKE_TYPE_LIST } from "../constants";

/**
 * @param {string[]} stateArr
 */
export const transformPokeTypeArrToValueMap = (defaultValue = false) => {
  return POKE_TYPE_LIST.reduce((acc, state) => {
    return {
      ...acc,
      [state]: defaultValue,
    };
  }, {});
};

export const capitalise = (str) => {
  if (typeof str !== "string") {
    return str;
  }
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

export const getPokemonDisplayName = (name) => {
  return capitalise(name);
};

/**
 * @param {string | URL | globalThis.Request} input
 * @param {RequestInit & {timeout?: number} | undefined} init
 */
export const fetchWithTimeout = (input, init) => {
  if (!init.timeout) {
    return fetch(input, init);
  }

  return Promise.race([
    fetch(input, init),
    new Promise((res) => {
      setTimeout(() => {
        const response = new Response(
          JSON.stringify({
            error: "timeout",
            message: "Timeout",
          })
        );
        res(response);
      }, init.timeout);
    }),
  ]);
};
