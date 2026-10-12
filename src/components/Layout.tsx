import { NavLink, Outlet } from "react-router-dom";
import { SymbolSprite } from "./SymbolSprite.tsx";

export function Layout() {
  return (
    <>
      <SymbolSprite />
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
