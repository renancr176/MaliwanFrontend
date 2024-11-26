import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { USER_ROLES, verifyRoles } from "../utils/userRoles";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const refreshRequest = Cookies.get("refreshRequest");
    const userJson = Cookies.get("user");
    if (refreshRequest && userJson) setUser(JSON.parse(userJson));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const tokenCookie = Cookies.get("accessToken");
    if (user && !tokenCookie) setUser(null);
  }, [location, user]);

  const signIn = (
    user,
    accessToken,
    expiresIn,
    refreshToken,
    refreshTokenExpiresIn
  ) => {
    setIsLoading(true);
    let userObj;
    try {
      const expiresInDays = expiresIn / 24 / 60 / 60;
      Cookies.set("accessToken", accessToken, { expires: expiresInDays });
      const refreshTokenExpiresInDays = refreshTokenExpiresIn / 24 / 60 / 60;
      Cookies.set(
        "refreshRequest",
        JSON.stringify({ accessToken, refreshToken }),
        { expires: refreshTokenExpiresInDays }
      );

      const roles = getRoles(accessToken);

      userObj = { ...user, roles };
      Cookies.set("user", JSON.stringify(userObj), {
        expires: refreshTokenExpiresInDays,
      });
      setUser(userObj);
    } catch (error) {
      console.error(error);
      userObj = null;
      throw new Error("Oooops!");
    } finally {
      setIsLoading(false);
      return userObj;
    }
  };

  const getRoles = (token) => {
    const tokenDecoded = jwtDecode(token);
    return typeof tokenDecoded.roles === "string"
      ? [tokenDecoded.roles]
      : tokenDecoded.roles;
  };

  const signOut = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("refreshRequest");
    Cookies.remove("user");
  };

  const isAuthenticated = user && Cookies.get("refreshRequest");

  const hasRoles = (roles) => {
    let userObj = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : user;
    return verifyRoles(roles, userObj?.roles ?? "");
  };

  const getUserAreaPath = () => {
    let userObj = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : user;
    if (!userObj) return "/";
    if (hasRoles([USER_ROLES.ADMIN])) return "/admin";
    return "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        isAuthenticated,
        isLoading,
        hasRoles,
        getUserAreaPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
