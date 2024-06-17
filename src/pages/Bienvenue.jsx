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
    <div className="flex items-center justify-between min-h-[90vh] flex-col  p-4">
      <div className=" text-4xl font-extrabold leading-[1.15] text-black sm:text-4xl text-center ">
        {localStorage.getItem("lan") &&
          data[localStorage.getItem("lan")][
            "Bienvenus sur le Dictionnaire de noms propres"
          ]}
      </div>
      <div className="flex items-center gap-5 flex-col w-full px-4">
        <div className="tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent sm:text-7xl text-5xl font-extrabold w-full text-center p-6">
          {localStorage.getItem("lan") &&
            data[localStorage.getItem("lan")]["Prolexbase"]}
        </div>
        <div className="flex sm:gap-[50vh] gap-4  ">
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
      <div className="flex items-center gap-[10vh] sm:flex-row flex-col min-h-[1vh]">
        {" "}
        <div className="flex flex-col items-center">
          <p className="font-bold">English</p>
          <img
            onClick={() => {
              localStorage.setItem("lan", "eng");
              window.location.reload();
            }}
            className="cursor-pointer h-[70px] w-[200px]"
            src={anglais}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">Francais</p>
          <img
            onClick={() => {
              localStorage.setItem("lan", "fra");
              window.location.reload();
            }}
            className="cursor-pointer h-[70px] w-[200px]"
            src={francais}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">العربية</p>
          <img
            onClick={() => {
              localStorage.setItem("lan", "arb");
              window.location.reload();
            }}
            className="cursor-pointer h-[70px] w-[200px]"
            src={arabe}
          />
        </div>
      </div>
    </div>
  );
};

export default Bienvenue;
