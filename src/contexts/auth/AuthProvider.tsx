import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiRegister } from "../../services/auth/apiRegister";

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

  async function register(email: string, firstName: string, password: string) {
    // FIXME: Figure out an elegant way to communicate to Register that register was successful or not.
    const registerResult = await apiRegister(email, firstName, password);

    if (registerResult.ok) {
      setIsLoading(false);
      setIsLoggedIn(true);

      setUserId(registerResult.user.id);
      setEmail(registerResult.user.email);
      setFirstName(registerResult.user.firstName);
    } else {
      setIsLoading(false);
      setIsLoggedIn(false);

      return { error: registerResult.error };
    }
  }

  const value = { userId, firstName, email, isLoading, isLoggedIn, register };

  return <AuthContext value={value}>{props.children}</AuthContext>;
}
