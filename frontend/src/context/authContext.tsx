import React, { createContext, useState, useContext, useEffect } from "react";
import { type User } from "../types.d";
import * as authService from "../services/authService";
import axiosClient from "../api/axiosClient";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  const fetchMe = async () => {
    try {
      const response = await axiosClient.get("/users/me");
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMe();
  }, []);
  const login = async (credentials: any) => {
    await authService.login(credentials);
    await fetchMe();
  };
  const logout = async () => {
    await authService.logout();
    setUser(null);
  };
  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("");
  }
  return context;
};
