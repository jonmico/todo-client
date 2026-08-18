interface User {
  email: string;
  firstName: string;
  password: string;
}

interface RegisterSuccess {
  ok: true;
  user: { email: string; id: string; firstName: string };
}

interface RegisterFailure {
  ok: false;
  error: string;
}

export async function apiRegister(
  user: User,
): Promise<RegisterSuccess | RegisterFailure> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: false, error: errorData.error };
  }

  const successData: {
    user: { email: string; id: string; firstName: string };
  } = await res.json();

  return { ok: true, user: successData.user };
}
