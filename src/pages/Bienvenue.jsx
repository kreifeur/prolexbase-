import React, { useEffect, useState } from "react";
import francois from "../assets/francois.jpg";
import oran from "../assets/oran.jpg";
import francais from "../assets/francais.webp";
import anglais from "../assets/anglais.webp";
import arabe from "../assets/arabe.jpg";
import data from "../translate.json";
import { useNavigate } from "react-router-dom";

const Bienvenue = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[90vh] flex-col gap-[5vh] ">
      <div className="mt-5 text-4xl font-extrabold leading-[1.15] text-black sm:text-5xl text-center ">
        {localStorage.getItem("lan") &&
          data[localStorage.getItem("lan")][
            "Bienvenus sur le Dictionnaire de noms propres"
          ]}
      </div>
      <div className="flex items-center gap-[10vh] flex-col sm:flex-row  w-full px-4">
        <div className="tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent sm:text-7xl text-5xl font-extrabold w-full text-center">
          {localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["Prolexbase"]}
        </div>
        <div className="flex sm:gap-[50vh] gap-4">
          <div>
            <img src={francois} />
          </div>

          <div>
            <img src={oran} />
          </div>
        </div>
      </div>

      <div className="text-lg">
        {" "}
        {localStorage.getItem("lan") &&
          data[localStorage.getItem("lan")]["Choisir la langue de L interface"]}
      </div>
      <div className="flex items-center gap-[10vh] sm:flex-row flex-col">
        {" "}
        <img
          onClick={() => {
            localStorage.setItem("lan", "eng");
            navigate("/");
          }}
          className="cursor-pointer h-[100px] w-[200px]"
          src={anglais}
        />
        <img
          onClick={() => {
            localStorage.setItem("lan", "fra");
            navigate("/");
          }}
          className="cursor-pointer h-[100px] w-[200px]"
          src={francais}
        />
        <img
          onClick={() => {
            localStorage.setItem("lan", "arb");
            navigate("/");
          }}
          className="cursor-pointer h-[100px] w-[200px]"
          src={arabe}
        />
      </div>
    </div>
  );
};

export default Bienvenue;
