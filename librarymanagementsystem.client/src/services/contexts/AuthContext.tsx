import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
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

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("https://localhost:7277/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true; // Login successful
      } else {
        console.error("Error logging in: ", response.statusText);
        return false; // Login failed
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      return false; // Login failed due to an error
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("https://localhost:7277/api/User/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsAuthenticated(false);
      } else {
        console.error("Error when trying to log out: ", response.statusText);
      }
    } catch (error) {
      console.error("Error when trying to log out: ", error);
    }
  };

  const signup = async (user: RegisterUserProps): Promise<boolean> => {
    try {
      const response = await fetch("https://localhost:7277/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup }}>
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
