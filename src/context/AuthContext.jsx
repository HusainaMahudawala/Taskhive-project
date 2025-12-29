import React, { createContext, useState, useEffect } from "react";
import {
  setLoggedInUser,
  getLoggedInUser,
  logoutUser
} from "../utils/storage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load logged-in user on refresh
  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // ✅ login with full user object
  const login = (userData) => {
    setLoggedInUser(userData);
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
