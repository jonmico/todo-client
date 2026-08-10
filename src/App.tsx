import { Outlet } from "react-router";
import GlobalNav from "./components/GlobalNav";

export default function App() {
  return (
    <>
      <GlobalNav />
      <Outlet />
    </>
  );
}
