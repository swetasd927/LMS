import { useState } from "react";

import { AuthContext } from "../context/AuthContext";

import type { User, UserRole } from "../types/auth.types";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const getStoredUsers = (): StoredUser[] => {
  const raw = localStorage.getItem("registeredUsers");
  return raw ? JSON.parse(raw) : [];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (email: string, role: UserRole) => {
    const displayName = email
      .split("@")[0]
      .replace(/[._-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const fakeUser: User = {
      id: `user_${email.toLowerCase()}`,
      name: displayName || "Demo User",
      email,
      role,
    };

    setUser(fakeUser);
    localStorage.setItem("user", JSON.stringify(fakeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const register = (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    const users = getStoredUsers();

    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (alreadyExists) {
      throw new Error("An account with this email already exists");
    }

    const newUser: StoredUser = {
      id: `user_${email.toLowerCase()}`,
      name,
      email,
      password,
      role,
    };

    localStorage.setItem(
      "registeredUsers",
      JSON.stringify([...users, newUser])
    );
  };

  const findUser = (email: string, password: string): User | null => {
    const users = getStoredUsers();

    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );

    if (!match) return null;

    return {
      id: match.id,
      name: match.name,
      email: match.email,
      role: match.role,
    };
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, findUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;