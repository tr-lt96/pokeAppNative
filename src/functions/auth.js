import { TOKEN_KEY } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithTimeout } from "./utils";

export const loginUser = async ({ username, password }) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return {
      token: "test-token",
    };
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/auth/login`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        usernameOrEmail: username,
        password,
      }),
      timeout: 5000,
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while logging in");
    }

    const result = await fetchResult?.json();

    if (result?.error === "timeout") {
      throw new Error("Time out");
    }

    if (!result?.token) {
      throw new Error("Issue while logging in");
    }

    return {
      token: result.token,
    };
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const registerUser = async ({ username, email, password }) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return true;
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/auth/register`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers,
      timeout: 5000,
    });

    if (fetchResult?.status !== 201) {
      throw new Error("Issue while registering");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }

      throw new Error(result.error);
    }

    return true;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const updateUserPassword = async ({
  currentPassword,
  newPassword,
  confirmNewPassword,
}) => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return true;
  }

  try {
    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/auth/change-password`;
    const token = (await AsyncStorage.getItem(TOKEN_KEY)) || "";
    if (!token) {
      return null;
    }

    const headers = new Headers();
    headers.append("Authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "PUT",
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
      headers,
      timeout: 5000,
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while updating password");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }
      throw new Error(result.error);
    }

    return true;
  } catch (error) {
    console.warn(`${error}`);
    return null;
  }
};

export const logoutUser = async () => {
  if (process.env.EXPO_PUBLIC_ENV === "local") {
    return true;
  }

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) {
      return null;
    }

    const endpoint = `${process.env.EXPO_PUBLIC_API_ENDPOINT}/auth/logout`;
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);

    const fetchResult = await fetchWithTimeout(endpoint, {
      method: "POST",
      headers,
      timeout: 5000,
    });

    if (!fetchResult?.ok) {
      throw new Error("Issue while logging out");
    }

    const result = await fetchResult?.json();

    if (!result || result.error) {
      if (result?.error === "timeout") {
        throw new Error("Time out");
      }
      throw new Error("Issue while logging out");
    }

    return true;
  } catch (error) {
    console.warn(`${error}`);
    return false;
  }
};
