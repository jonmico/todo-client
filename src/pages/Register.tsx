import { Link } from "react-router";
import AuthHeading from "../components/AuthHeading";
import styles from "./Register.module.css";
import AuthFormContainer from "../components/AuthFormContainer";

export default function Register() {
  return (
    <AuthFormContainer>
      <AuthHeading>Register</AuthHeading>
      <form className={styles.authForm}>
        <div className={styles.authFormData}>
          <label>Email</label>
          <input />
        </div>
        <div className={styles.authFormData}>
          <label>First Name</label>
          <input />
        </div>
        <div className={styles.authFormData}>
          <label>Password</label>
          <input />
        </div>
        <div className={styles.authFormData}>
          <label>Confirm Password</label>
          <input />
        </div>
        <button>Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here.</Link>
      </p>
    </AuthFormContainer>
  );
}
