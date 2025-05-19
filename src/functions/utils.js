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
