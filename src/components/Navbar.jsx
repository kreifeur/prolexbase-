import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import data from "../translate.json";
import { IoCloseSharp } from "react-icons/io5";
/* import { changeLanguage } from "../features/counter/counterSlice"; */
const Navbar = () => {
  const [menue, setMenue] = useState("hidden");
  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <div className="flex items-center justify-between sm:px-[10vh] px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white h-[10vh] sticky top-0">
      <Link to={"/"} onClick={() => setMenue("hidden")} className="text-2xl font-bold tracking-wider z-[2]">
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
          <Link to={"/add"}>
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["Ajout"]}
          </Link>
        ) : null}

        {window.localStorage.getItem("token") ? (
          <Link to={"/consultation"}>
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["Consultation"]}
          </Link>
        ) : null}

        {/* {window.localStorage.getItem("token") ? (
          <Link to={"/file"}>add file</Link>
        ) : null} */}
        {window.localStorage.getItem("token") ? (
          <button onClick={logout}>
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["LOGOUT"]}
          </button>
        ) : null}
      </div>

      <div className="sm:hidden flex z-[2]">
        {menue == "hidden" ? (
          <FiMenu onClick={() => setMenue("fixed")} className="text-4xl" />
        ) : (
          <IoCloseSharp
            onClick={() => setMenue("hidden")}
            className="text-4xl"
          />
        )}
      </div>

      <div
        className={`${menue} buttom-0 h-screen w-screen bg-blue-500 top-0 left-0 flex items-center justify-center font-bold text-xl sm:hidden`}
      >
        <div className="flex gap-4 flex-col items-center">
          <Link to={"/recherche"} onClick={() => setMenue("hidden")}>
            {" "}
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["recherche"]}
          </Link>
          <Link onClick={() => setMenue("hidden")} to={"/AdvancedSearch"}>
            {" "}
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["recherche avancé"]}
          </Link>
          <Link onClick={() => setMenue("hidden")} to={"/topnot"}>
            {localStorage.getItem("lan") &&
              data[localStorage.getItem("lan")]["Top Notoriété"]}
          </Link  >
          {window.localStorage.getItem("token") ? (
            <Link onClick={() => setMenue("hidden")} to={"/add"}>
              {localStorage.getItem("lan") &&
                data[localStorage.getItem("lan")]["Ajout"]}
            </Link>
          ) : null}

          {window.localStorage.getItem("token") ? (
            <Link onClick={() => setMenue("hidden")} to={"/consultation"}>
              {localStorage.getItem("lan") &&
                data[localStorage.getItem("lan")]["Consultation"]}
            </Link>
          ) : null}

          {window.localStorage.getItem("token") ? (
            <button onClick={logout}>
              {localStorage.getItem("lan") &&
                data[localStorage.getItem("lan")]["LOGOUT"]}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
