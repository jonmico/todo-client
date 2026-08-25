interface ServerTodo {
  id: string;
  user_id: string;
  title: string;
  description: string;
  completed: number;
  due_date: string;
  created_at: string;
  updated_at: string;
}

interface GetTodosSuccess {
  ok: true;
  todos: ServerTodo[];
}

interface GetTodosFailure {
  ok: false;
  error: string;
}

export async function apiGetTodos(): Promise<
  GetTodosSuccess | GetTodosFailure
> {
  const res = await fetch("/api/todos", {
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

  const data: { todos: ServerTodo[] } = await res.json();

  return { ok: true, todos: data.todos };
}
