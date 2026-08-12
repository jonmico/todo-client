import styles from "./AuthHeading.module.css";

interface AuthHeadingProps {
  children: React.ReactNode;
}

export default function AuthHeading(props: AuthHeadingProps) {
  return <h1 className={styles.header}>{props.children}</h1>;
}
