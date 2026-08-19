import { useState } from "react";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login() {
    // TODO: Write me.
  }

  async function logout() {
    // TODO: Write me.
  }

  async function register() {
    // TODO: Write me.
  }

  const value = { userId, firstName, email, isLoading, isLoggedIn };

  return <AuthContext value={value}>{props.children}</AuthContext>;
}
