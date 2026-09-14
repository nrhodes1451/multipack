import { NavLink, Outlet } from "react-router-dom";
import { FlowerSprite } from "./FlowerSprite.tsx";

export function Layout() {
  return (
    <>
      <FlowerSprite />
      <header className="site-nav no-print">
        <NavLink to="/" end>
          Multipack
        </NavLink>
        <NavLink to="/print">Contact sheet</NavLink>
      </header>
      <Outlet />
    </>
  );
}
