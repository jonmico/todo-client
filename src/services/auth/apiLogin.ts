interface LoginSuccess {
  ok: true;
  user: {
    id: string;
    email: string;
    firstName: string;
  };
}

interface LoginFailure {
  ok: false;
  error: string;
}

export async function apiLogin(
  email: string,
  password: string,
): Promise<LoginSuccess | LoginFailure> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: false, error: errorData.error };
  }

  const successData: {
    user: { id: string; email: string; firstName: string };
  } = await res.json();

  return { ok: true, user: successData.user };
}
