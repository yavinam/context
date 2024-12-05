import React from "react";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="h-20 header bg-slate-100 shadow-lg">
      <nav className="container flex gap-10 h-full items-center justify-center">
        <NavLink className={"text-2xl"} to={"/"}>
          Home
        </NavLink>
        {/* <NavLink className={"text-2xl"} to={"/about"}>
          About
        </NavLink> */}
        <NavLink className={"text-2xl"} to={"/login"}>
          Login
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
