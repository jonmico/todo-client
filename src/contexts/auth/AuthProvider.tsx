import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { apiRegister } from "../../services/auth/apiRegister";
import { apiLogin } from "../../services/auth/apiLogin";
import { apiLogout } from "../../services/auth/apiLogout";
import { apiGetMe } from "../../services/auth/apiMe";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkMe() {
      const meData = await apiGetMe();
      setIsLoading(false);

      if (!meData.ok) {
        setIsLoggedIn(false);
        console.error(meData.error);
        return;
      }

      setIsLoggedIn(true);
      setFirstName(meData.user.firstName);
      setEmail(meData.user.email);
      setUserId(meData.user.id);
    }
    checkMe();
  }, []);

  async function login(email: string, password: string) {
    const loginResult = await apiLogin(email, password);
    setIsLoading(false);

    if (!loginResult.ok) {
      setIsLoggedIn(false);
      return { ok: loginResult.ok, error: loginResult.error };
    }

    setIsLoggedIn(true);
    setUserId(loginResult.user.id);
    setEmail(loginResult.user.email);
    setFirstName(loginResult.user.firstName);
    return { ok: loginResult.ok };
  }

  async function logout() {
    const logoutResult = await apiLogout();
    setIsLoading(false);

    if (!logoutResult.ok) {
      return { ok: logoutResult.ok, error: logoutResult.error };
    }

    setIsLoggedIn(false);
    setUserId("");
    setFirstName("");
    setEmail("");
    return { ok: logoutResult.ok };
  }

  async function register(email: string, firstName: string, password: string) {
    const registerResult = await apiRegister(email, firstName, password);
    setIsLoading(false);

    if (!registerResult.ok) {
      setIsLoggedIn(false);
      return { ok: registerResult.ok, error: registerResult.error };
    }

    setIsLoggedIn(true);
    setUserId(registerResult.user.id);
    setEmail(registerResult.user.email);
    setFirstName(registerResult.user.firstName);
    return { ok: registerResult.ok };
  }

  const value = {
    userId,
    firstName,
    email,
    isLoading,
    isLoggedIn,
    register,
    login,
    logout,
  };

  return <AuthContext value={value}>{props.children}</AuthContext>;
}
