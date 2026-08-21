import { createContext } from "react";

interface IAuthContext {
  userId: string;
  firstName: string;
  email: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  register: (
    email: string,
    firstName: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<{ ok: true } | { ok: false; error: string }>;
}

export const AuthContext = createContext<IAuthContext | null>(null);
