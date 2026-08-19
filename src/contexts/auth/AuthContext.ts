import { createContext } from "react";

interface IAuthContext {
  userId: string;
  firstName: string;
  email: string;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);
