import {
  createContext,
} from "react";

import type {
  User,
  UserRole,
} from "../types/auth.types";

interface AuthContextType {
  user: User | null;

  login: (
    email: string,
    role: UserRole
  ) => void;

  logout: () => void;
}

export const AuthContext =
  createContext<
    AuthContextType | undefined
  >(undefined);