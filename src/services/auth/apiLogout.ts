interface LogoutSuccess {
  ok: true;
  message: string;
}

interface LogoutFailure {
  ok: false;
  error: string;
}

export async function apiLogout(): Promise<LogoutSuccess | LogoutFailure> {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: res.ok, error: errorData.error };
  }

  const data: { message: string } = await res.json();
  return { ok: res.ok, message: data.message };
}
