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
    useState<User | null>(
      null
    );

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
  };

  const logout =
    () => {
      setUser(null);
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