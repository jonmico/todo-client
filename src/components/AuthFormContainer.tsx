import styles from "./AuthFormContainer.module.css";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

export default function AuthFormContainer(props: AuthFormContainerProps) {
  return <div className={styles.authFormContainer}>{props.children}</div>;
}
