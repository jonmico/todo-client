import { useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import { apiCreateTodo } from "../services/todos/apiCreateTodo";
import styles from "./CreateTodo.module.css";

// TODO: Finish this.
// TODO: Figure out how to get date to work.
export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const result = await apiCreateTodo(title, description, dueDate);
  }

  return (
    <div>
      <h1>Create a todo</h1>
      <form onSubmit={handleSubmit} className={styles.todoForm}>
        <FormField>
          <label htmlFor="title">Title</label>
          <FormInput
            name="title"
            id="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
        </FormField>
        <FormField>
          <label>Description</label>
          <textarea className={styles.description} rows={5} />
        </FormField>
        <FormField>
          <label>Due Date</label>
          <FormInput type="date" />
        </FormField>
        <div>
          <Button>Create Todo</Button>
        </div>
      </form>
    </div>
  );
}
