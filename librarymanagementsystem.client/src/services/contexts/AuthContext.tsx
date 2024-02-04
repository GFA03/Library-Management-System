/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, ReactNode, useState } from "react";
import axios from "../axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AuthContextProps {
  isAuthenticated: boolean;
  role: string;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (user: RegisterUserProps) => Promise<boolean>;
}

interface RegisterUserProps {
  email: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post("User/login", { email, password });
      setRole(response.data.role[0]);
      setIsAuthenticated(true);
      if (response.status === 200) {
        toast.success("Login successful!");
      } else {
        toast.error("Error logging in!");
      }
      return true;
    } catch (error) {
      console.error("Error logging in: ", error);
      return false; // Login failed due to an error
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("User/logout");
      setIsAuthenticated(false);
      if (response.status === 200) {
        toast.success("Logout Successful!");
      } else {
        toast.error("Error logging out");
      }
    } catch (error) {
      console.error("Error when trying to log out: ", error);
    }
  };

  const signup = async (user: RegisterUserProps): Promise<boolean> => {
    try {
      const response = await axios.post("User/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Account created successfully!");
        return true;
      } else {
        console.error(
          "Error when trying to create user: ",
          response.statusText
        );
        return false;
      }
    } catch (error) {
      console.error("Error when trying to create user: ", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, role, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
