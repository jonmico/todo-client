interface CreateTodoSuccess {
  ok: true;
  message: string;
}

interface CreateTodoFailure {
  ok: false;
  error: string;
}

export async function apiCreateTodo(
  title: string,
  description: string,
  dueDate: string | undefined,
): Promise<CreateTodoSuccess | CreateTodoFailure> {
  const res = await fetch("/api/todos/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, description, dueDate }),
  });

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: false, error: errorData.error };
  }

  const data: { message: string } = await res.json();
  return { ok: true, message: data.message };
}
