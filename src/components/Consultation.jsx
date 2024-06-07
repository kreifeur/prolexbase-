import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Prolexeme from "./Prolexeme";
import Alias from "./Alias";
import Pivot from "./Pivot";
import Derive from "./Derive";
import data_json from "../translate.json";
const Consultation = () => {
  const [display, setDisplay] = useState("prolexeme");

  return (
    <div className="p-5">
      <div className="flex sm:gap-8  mb-4 justify-between sm:justify-start">
        <div
          className="py-1 px-5 bg-blue-600 text-white font-bold rounded-md cursor-pointer"
          onClick={() => setDisplay("prolexeme")}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["prolexeme"]}
        </div>
        <div
          className="py-1 px-5 bg-blue-600 text-white font-bold rounded-md cursor-pointer"
          onClick={() => setDisplay("pivot")}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["pivot"]}
        </div>
        <div
          className="py-1 px-5 bg-blue-600 text-white font-bold rounded-md cursor-pointer"
          onClick={() => setDisplay("alias")}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["alias"]}
        </div>
        <div
          className="py-1 px-5 bg-blue-600 text-white font-bold rounded-md cursor-pointer"
          onClick={() => setDisplay("derive")}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["dérives"]}
        </div>
      </div>
      <div>
        {display == "prolexeme" ? (
          <Prolexeme />
        ) : display == "alias" ? (
          <Alias />
        ) : display == "pivot" ? (
          <Pivot />
        ) : (
          <Derive />
        )}
      </div>
    </div>
  );
};

export default Consultation;
