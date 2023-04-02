import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export function Layout() {
  return (
    <div >
      <Outlet />
    </div>
  );
}
