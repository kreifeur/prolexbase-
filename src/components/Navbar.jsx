import React from "react";
import { Link } from "react-router-dom";

/* import { changeLanguage } from "../features/counter/counterSlice"; */
const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div className="flex items-center justify-between px-[10vh] bg-gradient-to-r from-blue-600 to-cyan-600 text-white h-[10vh]">
      <Link to={"/"} className="text-2xl font-bold tracking-wider">
        Prolexbase
      </Link>
      <div className=" flex gap-4">
        <Link to={"/recherche"}> Recherche</Link>
        <Link to={"/AdvancedSearch"}>Recherche avancé</Link>
        <Link to={"/topnot"}>Top Notoriété</Link>
        {window.localStorage.getItem("token") ? (
          <Link to={"/add"}>Ajout</Link>
        ) : null}

        {window.localStorage.getItem("token") ? (
          <Link to={"/consultation"}>Consultation</Link>
        ) : null}

        {/* {window.localStorage.getItem("token") ? (
          <Link to={"/file"}>add file</Link>
        ) : null} */}
        {window.localStorage.getItem("token") ? (
          <button onClick={logout}>LOGOUT</button>
        ) : null}

      </div>
    </div>
  );
};

export default Navbar;
