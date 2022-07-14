import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type AuthContextType = ReturnType<typeof useAuthAPI>;

interface IAuthResponse {
  ok: boolean;
  status: number | null;
  error: string;
}

const BASE_URL = "http://127.0.0.1:8000/api";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function useAuthAPI() {
  const [accessToken, setAccessToken] = useLocalStorage("accessToken");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken");
  const [user, setUser] = useLocalStorage("user");

  async function fetchUser(accessToken: string) {
    let res;

    try {
      res = await fetch(BASE_URL + "/profile", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "application/json",
        },
      });
    } catch (err) {
      console.error(err);
      return null;
    }

    const user = await res.json();
    return user;
  }

  async function login(
    username: string,
    password: string
  ): Promise<IAuthResponse> {
    let res;
    let data;
    try {
      res = await fetch(BASE_URL + "/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        status: null,
        error: "Something went wrong. Please try again later.",
      };
    }

    data = await res.json();
    if (res.ok) {
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
    }
    return { ok: res.ok, status: res.status, error: data.detail || "" };
  }

  async function signup(
    username: string,
    password: string,
    nickname: string | null
  ): Promise<IAuthResponse> {
    let res;
    try {
      res = await fetch(BASE_URL + "/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, nickname }),
      });
    } catch (err) {
      console.error(err);
      return {
        ok: false,
        status: null,
        error: "Something went wrong. Please try again later.",
      };
    }
    const data = await res.json();
    return { ok: res.ok, status: res.status, error: data.detail || "" };
  }

  function logout() {
    return;
  }

  async function refreshAccessToken() {
    return;
  }

  return {
    user,
    accessToken,
    refreshToken,
    login,
    signup,
    logout,
    refreshAccessToken,
  };
}
