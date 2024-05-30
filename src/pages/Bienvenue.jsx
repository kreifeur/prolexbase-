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
    <div className="flex items-center justify-center h-[90vh] flex-col gap-[5vh] ">
      <div className="mt-5 text-4xl font-extrabold leading-[1.15] text-black sm:text-5xl">
        Bienvenus sur le Dictionnaire de noms propres
      </div>
      <div className="flex items-center gap-[10vh]">
{/*         <div>
          {localStorage.getItem('lan') ?
             data[localStorage.getItem('lan')]["welcome"] :  data["fra"]["welcome"]
            }
        </div> */}
        <div>
          <img src={francois}  />
        </div>

        <div className="tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent text-7xl font-extrabold">
          Prolexbase
        </div>
        <div>
          <img src={oran}  />
        </div>
      </div>

      <div className="text-lg">Choisir la langue de L interface</div>
      <div className="flex items-center gap-[10vh]">
        {" "}
        <img
          onClick={() => {localStorage.setItem("lan", "eng"); navigate("/")}}
          className="cursor-pointer h-[100px] w-[200px]"
          src={anglais}
          
        />
        <img
          onClick={() => {localStorage.setItem("lan", "fra"); navigate("/")}}
          className="cursor-pointer h-[100px] w-[200px]"
          src={francais}
      
        />
        <img
          onClick={() => {localStorage.setItem("lan", "arb"); navigate("/")}}
          className="cursor-pointer h-[100px] w-[200px]"
          src={arabe}
          
        />
      </div>
    </div>
  );
};

export default Bienvenue;
