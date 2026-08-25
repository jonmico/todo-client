interface MeSuccess {
  ok: true;
  user: {
    id: string;
    firstName: string;
    email: string;
  };
}

interface MeFailure {
  ok: false;
  error: string;
}

export async function apiGetMe(): Promise<MeSuccess | MeFailure> {
  const res = await fetch("/api/auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: false, error: errorData.error };
  }

  const data: { user: { id: string; firstName: string; email: string } } =
    await res.json();

  return { ok: true, user: data.user };
}
