import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "./app/type/user";

type AuthState = {
  user: User | null;
  token: string | null; // store JWT token
  isAuthenticated: boolean;
  setUser: (user: User | null, token?: string) => void;
  logOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user, token) =>
        set({
          user,
          token: token ?? null,
          isAuthenticated: !!user,
        }),
      logOut: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);