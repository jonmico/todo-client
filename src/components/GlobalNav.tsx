import { Link, NavLink } from "react-router";
import styles from "./GlobalNav.module.css";

export default function GlobalNav() {
  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.todoApp}>
            <Link to="/">TodoApp</Link>
          </li>
        </ul>
        <ul className={styles.loginRegisterWrapper}>
          <li className={styles.navLink}>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className={styles.navLink}>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
