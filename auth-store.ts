import { create } from "zustand";
import { User } from "./app/type/user";
type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logOut: () => void;
};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  logOut: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
