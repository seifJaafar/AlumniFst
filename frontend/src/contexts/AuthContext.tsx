import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";

export type UserRole = "ALUMNI" | "ETUDIANT" | "ADMIN";

export interface PublicUser {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  promotion?: string;
  promotionYear?: number;
}

interface AuthContextType {
  user: PublicUser | null;
  isLoading: boolean;
  isInitializing: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isValidUser = (obj: unknown): obj is PublicUser =>
  typeof obj === "object" &&
  obj !== null &&
  ["userId", "email", "firstName", "lastName", "role"].every(
    (f) => f in (obj as object),
  );

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true); // ← for app boot
  const [isLoading, setIsLoading] = useState(false); // ← for login/register actions

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (isValidUser(parsed)) setUser(parsed);
        else localStorage.removeItem("user");
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsInitializing(false); // ← only this controls the boot state
  }, []);

  const saveUser = (data: PublicUser) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await authService.login({ email, password });

      saveUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setIsLoading(true);
    try {
      await authService.register(payload);
    } catch (error) {
      throw error; // ← rethrow
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isInitializing, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
