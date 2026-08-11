import { Link, NavLink } from "react-router";
import styles from "./GlobalNav.module.css";

export default function GlobalNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <div>
          <li className={styles.todoApp}>
            <Link to="/">TodoApp</Link>
          </li>
        </div>
        <div className={styles.loginRegisterWrapper}>
          <li className={styles.navLink}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink to="/register">Register</NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
