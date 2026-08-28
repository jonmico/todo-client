import { Outlet } from "react-router";
import AppNav from "../components/AppNav";

export default function AppLayout() {
  return (
    <>
      <AppNav />
      <Outlet />
    </>
  );
}
