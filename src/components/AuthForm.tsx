import type { FormHTMLAttributes } from "react";
import styles from "./AuthForm.module.css";

interface AuthFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function AuthForm(props: AuthFormProps) {
  return (
    <form {...props} className={styles.authForm}>
      {props.children}
    </form>
  );
}
