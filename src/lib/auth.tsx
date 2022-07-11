import React, { useState, createContext, useContext } from "react";
import useEffectOnUpdate from "./hooks/useEffectOnUpdate";

const BASE_URL = "http://127.0.0.1:8000/api";

type AuthContextType = ReturnType<typeof useAuthAPI>;

interface ILoginResponse {
  ok: boolean;
  status: number | null;
  error: string;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function useAuthAPI() {
  const [user, setUser] = useState(() => {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  });
  const [accessToken, setAccessToken] = useState(() => {
    const item = localStorage.getItem("accessToken");
    return item ? JSON.parse(item) : null;
  });
  const [refreshToken, setRefreshToken] = useState(() => {
    const item = localStorage.getItem("refreshToken");
    return item ? JSON.parse(item) : null;
  });

  useEffectOnUpdate(() => {
    if (!user) {
      localStorage.removeItem("user");
    }
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffectOnUpdate(() => {
    if (!accessToken) {
      localStorage.removeItem("accessToken");
    }
    localStorage.setItem("accessToken", accessToken as string);
  }, [accessToken]);

  useEffectOnUpdate(() => {
    if (!refreshToken) {
      localStorage.removeItem("refreshToken");
    }
    localStorage.setItem("refreshToken", refreshToken as string);
  }, [refreshToken]);

  async function getUser(accessToken: string) {
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
  ): Promise<ILoginResponse> {
    let res;
    let data;
    let user;

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
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      user = await getUser(data.accessToken);
      setUser(user);
    }
    return { ok: res.ok, status: res.status, error: data.detail || "" };
  }

  async function signup(
    username: string,
    password: string,
    nickname: string | null
  ) {
    return;
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

export function AuthProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) {
  const auth = useAuthAPI();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
