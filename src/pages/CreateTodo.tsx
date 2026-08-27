import { useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import { apiCreateTodo } from "../services/todos/apiCreateTodo";
import styles from "./CreateTodo.module.css";
import ServerError from "../components/ServerError";
import z, { flattenError } from "zod";
import AuthFormError from "../components/AuthFormError";
import { useNavigate } from "react-router";

// TODO: Clear form errors.
// TODO: Fix console error with dueDate. It does not like going from undefined to defined.

const createTodoSchema = z
  .string()
  .trim()
  .min(8, { error: "Title must be at least 8 characters." });

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const schemaResult = createTodoSchema.safeParse(title);

    if (!schemaResult.success) {
      const error = flattenError(schemaResult.error);
      setTitleError(error.formErrors[0]);
      return;
    }

    const result = await apiCreateTodo(title, description, dueDate);

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    return navigate("/todos");
  }

  return (
    <div>
      <h1>Create a todo</h1>
      <form onSubmit={handleSubmit} className={styles.todoForm}>
        {serverError && <ServerError>{serverError}</ServerError>}
        <FormField>
          <label htmlFor="title">Title</label>
          <FormInput
            name="title"
            id="title"
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          {titleError && <AuthFormError>{titleError}</AuthFormError>}
        </FormField>
        <FormField>
          <label htmlFor="description">Description</label>
          <textarea
            className={styles.description}
            rows={5}
            id="description"
            name="description"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
        </FormField>
        <FormField>
          <label htmlFor="dueDate">Due Date</label>
          <FormInput
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(evt) => setDueDate(evt.target.value)}
          />
        </FormField>
        <div>
          <Button>Create Todo</Button>
        </div>
      </form>
    </div>
  );
}
