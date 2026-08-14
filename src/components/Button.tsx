import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "submit";
}

// TODO: More styling/different button types.
export default function Button(props: ButtonProps) {
  return (
    <button type={props.type} className={styles.button}>
      {props.children}
    </button>
  );
}
