import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { apiGetTodo } from "../services/todos/apiGetTodo";
import type { Todo } from "../types/todo";

export default function Todo() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function fetchTodo() {
      const result = await apiGetTodo(params.id);
      setIsLoading(false);

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setTodo(result.todo);
    }
    fetchTodo();
  }, [params.id]);

  // Return Loading is isLoading is true.
  if (isLoading) return <div>Loading...</div>;

  // If todo is still null, there was an error so return error.
  if (!todo) return <div>{error}</div>;

  // Everything is good, render the todo.
  return (
    <div>
      <h1>{todo.title}</h1>
      <div>{todo.description}</div>
    </div>
  );
}
