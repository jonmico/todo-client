import { Link, NavLink } from "react-router";

export default function GlobalNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">TodoApp</Link>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      </ul>
    </nav>
  );
}
