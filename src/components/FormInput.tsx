import type { InputHTMLAttributes } from "react";
import styles from "./FormInput.module.css";

// FIXME: Is this chill?
// interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function FormInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return <input className={styles.input} {...props} />;
}
