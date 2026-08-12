import { Outlet } from "react-router";
import GlobalNav from "./components/GlobalNav";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <GlobalNav />
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
}
