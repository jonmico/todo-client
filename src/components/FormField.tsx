import styles from "./FormField.module.css";

interface FormFieldProps {
  children: React.ReactNode;
}

export default function FormField(props: FormFieldProps) {
  return <div className={styles.formField}>{props.children}</div>;
}
