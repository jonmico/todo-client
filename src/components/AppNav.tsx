import { NavLink } from "react-router";
import styles from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav>
      <ul className={styles.navList}>
        <NavLink to="/todos" className={styles.navItem}>
          Todos
        </NavLink>
        <NavLink to="/create" className={styles.navItem}>
          Create Todo
        </NavLink>
      </ul>
    </nav>
  );
}
