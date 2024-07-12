import axios from "axios";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import pays from "../assets/pays.jpg";
import nom from "../assets/nom.jpg";
import prenom from "../assets/prenom.jpg";
import data_json from "../translate.json";

const AdvancedSearch = () => {
  const [data, setData] = useState();
  const [inputs, setInputs] = useState({
    language: localStorage.lan,
    last: "",
    first: "",
    middle: "",
    type: "",
  });
  const [error, setError] = useState("");

  const fetchdata = async () => {
    const res = await axios.post("http://127.0.0.1:5000/find_adv", inputs);
    setData(res.data.results);
  };

  const send = () => {
    fetchdata();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      send();
    }
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setInputs({ ...inputs, [field]: value });

    if (inputs.language === "arb") {
      const frenchCharacters = /[A-Za-z]/;
      if (frenchCharacters.test(value)) {
        setError(
          data_json[localStorage.getItem("lan")][
            "Erreur: Veuillez entrer des caractères arabes."
          ]
        );
      } else {
        setError("");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className="flex min-h-[90vh] flex-col sm:flex-row">
      <div className="flex-[2] flex flex-col items-center p-4 gap-8 sm:border-r border-b">
        <div className="w-full">
          <div className="mb-1 p-1 font-bold">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "Choisir la langue de recherche"
              ]}
          </div>
          <select
            className="p-1 outline-none w-[100%] rounded-md border"
            value={inputs.language}
            onChange={(e) => setInputs({ ...inputs, language: e.target.value })}
          >
            <option value="fra">Francais</option>
            <option value="eng">Englais</option>
            <option value="arb">Arabe</option>
          </select>
        </div>
        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder={`${
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["start with"]
          }`}
          type="text"
          onChange={(e) => handleInputChange(e, "first")}
          onKeyUp={handleKeyUp}
        />
        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder={`${
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["contain"]
          }`}
          type="text"
          onChange={(e) => handleInputChange(e, "middle")}
          onKeyUp={handleKeyUp}
        />
        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder={`${
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["end with"]
          }`}
          type="text"
          onChange={(e) => setInputs(...inputs, type=e.target.value)}
          
        />

        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder={`${
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["type"]
          }`}
          type="text"
          onChange={(e) => handleInputChange(e, "type")}
          onKeyUp={handleKeyUp}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <button
          className=" rounded-md p-2 w-full text-white tracking-widest font-bold bg-gradient-to-r from-blue-600 to-cyan-600"
          onClick={send}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["recherche"]}
        </button>
      </div>
      <div className="flex-[7] p-4">
        {data ? (
          data.map((result, index) => {
            return <div key={index}>{result[1]}</div>;
          })
        ) : (
          <div className="flex flex-col gap-[10vh] items-center justify-center h-full">
            <div className="text-3xl font-bold text-blue-500">
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["Prolexbase"]}
            </div>
            <div className="sm:w-[80%] w-full flex items-center h-[6vh]">
              <div className="h-full w-[10%] flex items-center justify-center border border-blue-500 bg-blue-500 cursor-pointer">
                <IoSearch onClick={send} className=" text-xl text-white" />
              </div>
              <input
                onChange={(e) => handleInputChange(e, "middle")}
                className="border border-blue-500 w-[90%] h-full outline-none px-3"
                placeholder={`${
                  localStorage.getItem("lan") &&
                  data_json[localStorage.getItem("lan")][
                    "Entrer le nom propre à rechercher"
                  ]
                }`}
                type="text"
                onKeyUp={handleKeyUp}
              />
            </div>
            <div className="flex items-center justify-between sm:w-[70%] w-[100%]">
              <div className="flex flex-col gap-3 items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md ">un pays</div>
                <img className="h-[60px]" src={pays} alt="" />
                <div className="text-xl text-blue-500 ">France</div>
              </div>
              <div className="flex flex-col gap-3 items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md ">un nom</div>
                <img className="h-[60px]" src={nom} alt="" />
                <div className="text-xl text-blue-500 ">Ninou</div>
              </div>
              <div className="flex flex-col gap-3 items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md ">un prénom</div>
                <img className="h-[60px]" src={prenom} alt="" />
                <div className="text-xl text-blue-500 ">Adel</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSearch;
