import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const COOKIE_NAME = "isLoggedIn";
const COOKIE_EXPIRY_MS = 10000;

const setCookie = (name, value, ms) => {
  const expires = new Date(Date.now() + ms).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const cookie = getCookie(COOKIE_NAME);
    if (cookie === "true") setIsLoggedIn(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    setCookie(COOKIE_NAME, true, COOKIE_EXPIRY_MS);
  };

  const logout = () => {
    setIsLoggedIn(false);
    deleteCookie(COOKIE_NAME);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
