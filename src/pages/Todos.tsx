import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { apiGetTodos } from "../services/todos/apiGetTodos";
import styles from "./Todos.module.css";
import { Link } from "react-router";

interface Todo {
  id: string;
  title: string;
  description?: string;
  due_date: string;
  completed: number;
  created_at: string;
  updated_at: string;
}

export default function Todos() {
  const { firstName } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      const result = await apiGetTodos();

      if (!result.ok) {
        console.error(result.error);
        return;
      }

      setTodos(result.todos);
    }
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>{firstName}'s Todos</h1>

      <ul className={styles.todoList}>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

interface TodoProps {
  todo: Todo;
}

function Todo(props: TodoProps) {
  return (
    <li className={styles.todo}>
      <h2 className={styles.todoTitle}>{props.todo.title}</h2>
      <div>
        {props.todo.description ? (
          <p>{props.todo.description}</p>
        ) : (
          <p className={styles.noDescription}>No description provided.</p>
        )}
      </div>
      <Link to={props.todo.id}>View</Link>
    </li>
  );
}
