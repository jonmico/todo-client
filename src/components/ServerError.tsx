import styles from "./ServerError.module.css";

interface ServerErrorProps {
  children: React.ReactNode;
}

export default function ServerError(props: ServerErrorProps) {
  return <p className={styles.serverError}>{props.children}</p>;
}
