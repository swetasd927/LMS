import { createContext } from "react";

import type { User, UserRole } from "../types/auth.types";

interface AuthContextType {
  user: User | null;

  login: (email: string, role: UserRole) => void;

  logout: () => void;

  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => void;

  findUser: (email: string, password: string) => User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);