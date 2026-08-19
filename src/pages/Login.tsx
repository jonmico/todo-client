import { Link, useNavigate } from "react-router";
import AuthFormContainer from "../components/AuthFormContainer";
import AuthHeading from "../components/AuthHeading";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import { useState } from "react";
import AuthForm from "../components/AuthForm";
import z, { flattenError } from "zod";
import { apiLogin } from "../services/auth/apiLogin";
import AuthFormError from "../components/AuthFormError";
import ServerError from "../components/ServerError";

interface LoginFormState {
  email: string;
  password: string;
}

const initialLoginFormState: LoginFormState = {
  email: "",
  password: "",
};

const initialLoginFormErrors: LoginFormState = {
  email: "",
  password: "",
};

const loginSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  password: z.string(),
});

export default function Login() {
  const [loginFormState, setLoginFormState] = useState(initialLoginFormState);
  const [loginFormErrors, setLoginFormErrors] = useState(
    initialLoginFormErrors,
  );
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function handleOnChange(
    evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setLoginFormState((state) => {
      return {
        ...state,
        [evt.target.name]: evt.target.value,
      };
    });
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();

    const schemaResult = loginSchema.safeParse(loginFormState);

    if (!schemaResult.success) {
      const errors = flattenError(schemaResult.error);

      setLoginFormErrors({
        email: errors.fieldErrors.email?.[0] ?? "",
        password: errors.fieldErrors.password?.[0] ?? "",
      });

      return;
    }

    const result = await apiLogin(
      loginFormState.email,
      loginFormState.password,
    );

    // TODO: Finish this form.
    if (result.ok) {
      return navigate("/todos");
    } else {
      setServerError(result.error);
      return;
    }
  }

  return (
    <AuthFormContainer>
      <AuthHeading>Login</AuthHeading>
      <AuthForm onSubmit={handleSubmit}>
        {serverError && <ServerError>{serverError}</ServerError>}
        <FormField>
          <label htmlFor="email">Email</label>
          <FormInput
            name="email"
            id="email"
            autoComplete="off"
            onChange={handleOnChange}
            value={loginFormState.email}
          />
          {loginFormErrors.email && (
            <AuthFormError>{loginFormErrors.email}</AuthFormError>
          )}
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
          <FormInput
            name="password"
            id="password"
            type="password"
            onChange={handleOnChange}
            value={loginFormState.password}
          />
          {loginFormErrors.password && (
            <AuthFormError>{loginFormErrors.password}</AuthFormError>
          )}
        </FormField>
        <Button>Login</Button>
      </AuthForm>
      <p>
        Don't have an account? <Link to="/register">Sign up here</Link>.
      </p>
    </AuthFormContainer>
  );
}
