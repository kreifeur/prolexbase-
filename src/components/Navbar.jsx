import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import data from "../translate.json";
/* import { changeLanguage } from "../features/counter/counterSlice"; */
const Navbar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };


  return (
    <div className="flex items-center justify-between sm:px-[10vh] px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white h-[10vh] ">
      <Link to={"/"} className="text-2xl font-bold tracking-wider">
        {localStorage.getItem("lan") &&
          data[localStorage.getItem("lan")]["Prolexbase"]}
      </Link>
      <div className=" sm:flex gap-4 hidden">
        <Link to={"/recherche"}>
          {" "}
          {localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["recherche"]}
        </Link>
        <Link to={"/AdvancedSearch"}>
          {" "}
          {localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["recherche avancé"]}
        </Link>
        <Link to={"/topnot"}>
          {localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["Top Notoriété"]}
        </Link>
        {window.localStorage.getItem("token") ? (
          <Link to={"/add"}>{localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["Ajout"]}</Link>
        ) : null}

        {window.localStorage.getItem("token") ? (
          <Link to={"/consultation"}>{localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["Consultation"]}</Link>  
        ) : null}

        {/* {window.localStorage.getItem("token") ? (
          <Link to={"/file"}>add file</Link>
        ) : null} */}
        {window.localStorage.getItem("token") ? (
          <button onClick={logout}>{localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["LOGOUT"]}</button>
        ) : null}
      </div>

      <div className="sm:hidden flex">
        <FiMenu className="text-4xl" />
      </div>
    </div>
  );
};

export default Navbar;
