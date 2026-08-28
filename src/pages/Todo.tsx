import { useParams } from "react-router";

// TODO: Fetch Todo.

export default function Todo() {
  const params = useParams();

  return (
    <div>
      <h1>This is the Todo page.</h1>
      <div>{params.id}</div>
    </div>
  );
}
