import { useState } from "react";
import { Link } from "react-router";
import AuthFormContainer from "../components/AuthFormContainer";
import AuthHeading from "../components/AuthHeading";
import Button from "../components/Button";
import FormField from "../components/FormField";
import FormInput from "../components/FormInput";
import styles from "./Register.module.css";

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

export default function Register() {
  const [registerFormState, setRegisterFormState] = useState(
    initialRegisterFormState,
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

  return (
    <AuthFormContainer>
      <AuthHeading>Register</AuthHeading>
      <form className={styles.authForm}>
        <FormField>
          <label htmlFor="email">Email</label>
          <FormInput
            name="email"
            id="email"
            type="email"
            autoComplete="off"
            onChange={handleOnChange}
            value={registerFormState.email}
          />
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
        </FormField>
        <Button type="submit">Register</Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </AuthFormContainer>
  );
}
