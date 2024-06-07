import axios from "axios";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import data_json from '../translate.json'

const Add = () => {
  const [lang, setLang] = useState(localStorage.lan);
  const [inputs, setInputs] = useState({
    prolexeme: "",
    source: "",
    Num_pivot: "",
    Type: "",
    Existance: "",
    Notorite: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const fetchdata = async () => {
    const res = await axios.post("http://127.0.0.1:5000/add", {
      token:localStorage.token,
      ...inputs,
      langue: lang,
    });
    setInputs({
      prolexeme: "",
      source: "",
      Num_pivot: "",
      Type: "",
      Existance: "",
      Notorite: "",
    })
  };

  const addData = () => {
    fetchdata();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link
        to={"/file"}
        className="bg-blue-500 font-bold text-white py-1 px-4"
      >
        
        {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Ajout fichier de noms propres"]}
      </Link>
      <select
        className="p-1 outline-none  sm:w-[40%] w-full rounded-md border"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="fra">Francais</option>
        <option value="eng">Englais</option>
        <option value="arb">Arabe</option>
      </select>
      {Object.keys(inputs).map((key) => (
        <div className="flex flex-col gap-2 sm:w-[40%] w-full" key={key}>
          {/* <label htmlFor={key}>{key}:</label> */}
          <input
            className="border p-2 outline-none rounded-md"
            type="text"
            placeholder={key}
            id={key}
            name={key}
            value={inputs[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button
        className="bg-gradient-to-r from-blue-600 to-cyan-600 sm:w-[50%]  text-white font-bold rounded-md h-[5vh] sm:max-w-max px-[10vh] w-[100%]"
        onClick={addData}
      >
        {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["ajouter"]}
      </button>
    </div>
  );
};

export default Add;
