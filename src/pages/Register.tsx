import { useState } from "react";
import { Link, useNavigate } from "react-router";
import z, { flattenError } from "zod";
import AuthForm from "../components/AuthForm";
import AuthFormContainer from "../components/AuthFormContainer";
import AuthFormError from "../components/AuthFormError";
import AuthHeading from "../components/AuthHeading";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import ServerError from "../components/ServerError";
import { useAuth } from "../hooks/useAuth";

interface RegisterFormState {
  email: string;
  firstName: string;
  password: string;
  confirmPassword: string;
}

const initialRegisterFormState: RegisterFormState = {
  email: "",
  firstName: "",
  password: "",
  confirmPassword: "",
};

const initialRegisterErrorsState: RegisterFormState = {
  email: "",
  firstName: "",
  password: "",
  confirmPassword: "",
};

const registerSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  firstName: z.string().trim().min(1, { error: "Please enter a first name." }),
  password: z
    .string()
    .trim()
    .min(4, { error: "Password must be at least 4 characters." }),
  confirmPassword: z
    .string()
    .trim()
    .min(4, { error: "Password must be at least 4 characters." }),
});

export default function Register() {
  const [registerFormState, setRegisterFormState] = useState(
    initialRegisterFormState,
  );
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const [registerFormErrors, setRegisterFormErrors] = useState(
    initialRegisterErrorsState,
  );
  const { register } = useAuth();

  function handleOnChange(
    evt: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    setRegisterFormState((state) => {
      return {
        ...state,
        [evt.target.name]: evt.target.value,
      };
    });
  }

  async function handleSubmit(evt: React.SubmitEvent<HTMLFormElement>) {
    evt.preventDefault();
    const user = {
      email: registerFormState.email,
      firstName: registerFormState.firstName,
      password: registerFormState.password,
      confirmPassword: registerFormState.confirmPassword,
    };

    const schemaResult = registerSchema.safeParse(user);

    if (!schemaResult.success) {
      const errors = flattenError(schemaResult.error);

      setRegisterFormErrors({
        email: errors.fieldErrors.email?.[0] ?? "",
        firstName: errors.fieldErrors.firstName?.[0] ?? "",
        password: errors.fieldErrors.password?.[0] ?? "",
        confirmPassword: "",
      });

      if (registerFormState.confirmPassword !== registerFormState.password) {
        setRegisterFormErrors((state) => {
          return { ...state, confirmPassword: "Passwords must match." };
        });
      }

      return;
    }

    const { email, firstName, password } = schemaResult.data;

    const result = await register(email, firstName, password);

    // FIXME: This is the thing that does not seem elegant.
    if (result?.error) {
      setServerError(result.error);
      return;
    } else {
      return navigate("/todos");
    }
  }

  return (
    <AuthFormContainer>
      <AuthHeading>Register</AuthHeading>
      <AuthForm onSubmit={handleSubmit}>
        {serverError && <ServerError>{serverError}</ServerError>}
        <FormField>
          <label htmlFor="email">Email</label>
          <FormInput
            name="email"
            id="email"
            autoComplete="off"
            onChange={handleOnChange}
            value={registerFormState.email}
          />
          {registerFormErrors.email && (
            <AuthFormError>{registerFormErrors.email}</AuthFormError>
          )}
        </FormField>
        <FormField>
          <label htmlFor="firstName">First Name</label>
          <FormInput
            name="firstName"
            id="firstName"
            autoComplete="off"
            onChange={handleOnChange}
            value={registerFormState.firstName}
          />
          {registerFormErrors.firstName && (
            <AuthFormError>{registerFormErrors.firstName}</AuthFormError>
          )}
        </FormField>
        <FormField>
          <label htmlFor="password">Password</label>
          <FormInput
            name="password"
            id="password"
            type="password"
            onChange={handleOnChange}
            value={registerFormState.password}
          />
          {registerFormErrors.password && (
            <AuthFormError>{registerFormErrors.password}</AuthFormError>
          )}
        </FormField>
        <FormField>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <FormInput
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            onChange={handleOnChange}
            value={registerFormState.confirmPassword}
          />
          {registerFormErrors.confirmPassword && (
            <AuthFormError>{registerFormErrors.confirmPassword}</AuthFormError>
          )}
        </FormField>
        <Button type="submit">Register</Button>
      </AuthForm>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </AuthFormContainer>
  );
}
