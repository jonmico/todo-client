import { Link } from "react-router";
import styles from "./Index.module.css";

export default function Index() {
  return (
    <div className={styles.indexWrapper}>
      <h1>TodoApp</h1>
      <div className={styles.content}>
        <p>A simple way to track all the things you need to do.</p>
        <p>
          <Link to="/register" className={styles.link}>
            Sign up
          </Link>{" "}
          today or{" "}
          <Link to="/login" className={styles.link}>
            login here
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
