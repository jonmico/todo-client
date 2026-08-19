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
  ) => Promise<
    | {
        error: string;
      }
    | undefined
  >;
}

export const AuthContext = createContext<IAuthContext | null>(null);
