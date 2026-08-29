import type { Todo } from "../../types/todo";

interface GetTodoSuccess {
  ok: true;
  todo: Todo;
}

interface GetTodoFailure {
  ok: false;
  error: string;
}

export async function apiGetTodo(
  id: string | undefined,
): Promise<GetTodoSuccess | GetTodoFailure> {
  const res = await fetch(`/api/todos/${id}`);

  if (!res.ok) {
    const errorData: { error: string } = await res.json();
    return { ok: false, error: errorData.error };
  }

  const data: { todo: Todo } = await res.json();
  return { ok: true, todo: data.todo };
}
