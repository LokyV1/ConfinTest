import React, { createContext, useContext, useState, useEffect } from "react";
import { type User, authService } from "@/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || sessionStorage.getItem("token"),
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (storedToken) {
        try {
          const userData = await authService.getUser(storedToken);
          if (userData) {
            setUser(userData);
            setToken(storedToken);
          } else {
            handleLogout();
          }
        } catch (error) {
          handleLogout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
    remember: boolean = false,
  ) => {
    try {
      const response = await authService.login(email, password);

      if (remember) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      } else {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("user", JSON.stringify(response.user));
      }

      setToken(response.token);
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
