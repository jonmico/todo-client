import styles from "./AuthFormError.module.css";

interface AuthFormErrorProps {
  children: React.ReactNode;
}

export default function AuthFormError(props: AuthFormErrorProps) {
  return <div className={styles.authFormError}>{props.children}</div>;
}
