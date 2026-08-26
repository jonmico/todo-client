import { useEffect, useState } from "react";
import { apiGetTodos } from "../services/todos/apiGetTodos";
import { Link } from "react-router";

export default function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      const result = await apiGetTodos();
      console.log(result);
    }
    fetchTodos();
  }, []);
  return (
    <div>
      <h1>This is the Todos page!</h1>
      <p>
        <Link to="create">Here</Link> is a link the the create todo page.
      </p>
    </div>
  );
}
