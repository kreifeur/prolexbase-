import axios from "axios";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import pays from "../assets/pays.jpg";
import nom from "../assets/nom.jpg";
import prenom from "../assets/prenom.jpg";

const AdvancedSearch = () => {
  const [data, setData] = useState();
  const [inputs, setInputs] = useState({
    language: localStorage.lan,
    last: "",
    first: "",
    middle: "",
  });
  const fetchdata = async () => {
    const res = await axios.post("http://127.0.0.1:5000/find_adv", inputs);
    setData(res.data.results);
  };
  const send = () => {
    fetchdata();
  };
  return (
    <div className="flex h-[90vh] flex-col sm:flex-row">
      <div className="flex-[2] flex flex-col items-center  p-4 gap-8 sm:border-r border-b">
        <div className="w-full">
          <div className="mb-1 p-1 font-bold">
            Choisir la langue de recherche
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
          placeholder="start with"
          type="text"
          onChange={(e) => setInputs({ ...inputs, first: e.target.value })}
        />
        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder="contain"
          type="text"
          onChange={(e) => setInputs({ ...inputs, middle: e.target.value })}
        />
        <input
          className="p-2 border rounded-md outline-none w-[100%] "
          placeholder="end with"
          type="text"
          onChange={(e) => setInputs({ ...inputs, last: e.target.value })}
        />
        <button
          className=" rounded-md p-2 w-full text-white tracking-widest font-bold bg-gradient-to-r from-blue-600 to-cyan-600"
          onClick={send}
        >
          {" "}
          Recherche
        </button>
      </div>
      <div className="flex-[7] p-4">
        {data ? (
          data.map((result , index) => {
            return <div key={index}>{result[1]}</div>;
          })
        ) : (
          <div className="flex flex-col gap-[10vh] items-center justify-center h-full">
            <div className="text-3xl font-bold text-blue-500">Prolexbase</div>
            <div className="sm:w-[80%] w-full flex items-center h-[6vh]">
              <div className="h-full w-[10%] flex items-center justify-center border border-blue-500 bg-blue-500 cursor-pointer">
                <IoSearch onClick={send} className=" text-xl text-white" />
              </div>

              <input
                onChange={(e) =>
                  setInputs({ ...inputs, middle: e.target.value })
                }
                className="border border-blue-500 w-[90%]   h-full outline-none px-3"
                placeholder="Nom à rechercher"
                type="text"
              />
            </div>

            <div className="flex items-center justify-between sm:w-[70%] w-[100%]">
              <div className="flex flex-col gap-3 items-center h-full justify-between ">
                <div className="px-3 py-1 border rounded-md ">un pays</div>
                <img src={pays} alt="" />
                <div className="text-xl text-blue-500 ">France</div>
              </div>

              <div className="flex flex-col gap-3 items-center h-full justify-between ">
                <div className="px-3 py-1 border rounded-md ">un nom</div>
                <img src={nom} alt="" />
                <div className="text-xl text-blue-500 ">Ninou</div>
              </div>

              <div className="flex flex-col gap-3 items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md ">un prénom</div>
                <img src={prenom} alt="" />
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
