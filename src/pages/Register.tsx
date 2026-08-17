import { useState } from "react";
import { Link, useNavigate } from "react-router";
import AuthFormContainer from "../components/AuthFormContainer";
import AuthHeading from "../components/AuthHeading";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import styles from "./Register.module.css";
import { apiRegister } from "../services/auth/apiRegister";
import z, { flattenError } from "zod";
import AuthFormError from "../components/AuthFormError";

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
      console.log(schemaResult);

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

    const result = await apiRegister(user);

    if (result.ok) {
      navigate("/todos");
    } else {
      setServerError(result.error);
    }
  }

  return (
    <AuthFormContainer>
      <AuthHeading>Register</AuthHeading>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        {serverError && <p className={styles.serverError}>{serverError}</p>}
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
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </AuthFormContainer>
  );
}
