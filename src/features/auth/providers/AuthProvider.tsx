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
  // Stable id derived from email (not crypto.randomUUID()) so a returning
  // instructor keeps seeing the courses they created in earlier sessions —
  // a random id per login would silently "orphan" their courses.
  const displayName = email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const fakeUser: User =
    {
      id:
        `user_${email.toLowerCase()}`,
      name: displayName || "Demo User",
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