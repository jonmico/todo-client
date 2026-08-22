import { Link, NavLink, useNavigate } from "react-router";
import styles from "./GlobalNav.module.css";
import { useAuth } from "../hooks/useAuth";

// TODO: Conditionally render Login/Register/Logout depending on isLoggedIn state.
// TODO: Create and hookup logout button.

export default function GlobalNav() {
  const { isLoading, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    const data = await logout();

    if (data.ok) {
      return navigate("/login");
    } else {
      console.error(data.error);
    }
  }

  return (
    <div className={styles.navWrapper}>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.todoApp}>
            <Link to="/">TodoApp</Link>
          </li>
        </ul>
        {!isLoggedIn ? (
          <ul className={styles.loginRegisterWrapper}>
            <li className={styles.navLink}>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className={styles.navLink}>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        ) : (
          <div>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
