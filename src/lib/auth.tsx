import React, { useState, createContext, useContext } from "react";
import useEffectOnUpdate from "./hooks/useEffectOnUpdate";

const BASE_URL = "http://127.0.0.1:8000/api";

interface IAuthContext {
  user: string;
  accessToken: string | null;
  refreshToken: string | null;
  login: Function;
  signup: Function;
  logout: Function;
  refreshAccessToken: Function;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

function useAuthAPI() {
  const userData = localStorage.getItem("user");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") ?? "{}") as string
  );
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken")
  );

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

  async function login(username: string, password: string) {
    try {
      const res = await fetch(BASE_URL + "/token", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(res.json());
    } catch (err) {
      console.error(err);
    }
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
  return (
    <AuthContext.Provider value={auth as IAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
