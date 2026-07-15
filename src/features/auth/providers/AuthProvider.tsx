import {
  useState,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import type {
  User,
  UserRole,
} from "../types/auth.types";

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser): null
    });

  const login = (
    email: string,
    role: UserRole
  ) => {
    const fakeUser: User =
      {
        id:
          crypto.randomUUID(),
        name:
          "Demo User",
        email,
        role,
      };

    setUser(fakeUser);
    localStorage.setItem(
        "user", JSON.stringify(fakeUser)
    )
  };

  const logout =
    () => {
      setUser(null);
      localStorage.removeItem("user")
    };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;