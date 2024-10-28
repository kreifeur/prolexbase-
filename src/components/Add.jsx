import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import data_json from "../translate.json";

const Add = () => {
  const [lang, setLang] = useState(localStorage.lan);
  const [inputs, setInputs] = useState({
    prolexeme: "",
    source: "",
    Num_pivot: "",
    Type: "Nom propre",
    Existance: "Historique",
    Notorite: "1",
  });

  const [types, setTypes] = useState([[""]]);
  const [existances, setExistances] = useState([[""]]);

  const gettypes = async () => {
    const res = await axios.get("http://127.0.0.1:5000/gettypes");
    setTypes(res.data.types);
  };

  const getexistances = async () => {
    const res = await axios.get("http://127.0.0.1:5000/getexistance");
    /*     console.log(res.data.types); */
    setExistances(res.data.existences);
  };

  useState(() => {
    gettypes();
    getexistances();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const fetchdata = async () => {
    const res = await axios.post("http://127.0.0.1:5000/add", {
      token: localStorage.token,
      ...inputs,
      langue: lang,
    });
    setInputs({...inputs,
      prolexeme: "",
      source: "",
      Num_pivot: "",
    });
  };

  const addData = () => {
    fetchdata();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <Link
        to={"/file"}
        className="bg-blue-500 font-bold text-white py-2 px-4 sm:max-w-max rounded-md"
      >
        {localStorage.getItem("lan") &&
          data_json[localStorage.getItem("lan")][
            "Ajout fichier de noms propres"
          ]}
      </Link>

      <h1 className="font-bold text-xl">
        {localStorage.getItem("lan") &&
          data_json[localStorage.getItem("lan")]["Ajout d'un nom propre"]}
      </h1>

      <select
        className="p-1 outline-none sm:w-[40%] w-full rounded-md border"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="fra">Francais</option>
        <option value="eng">Englais</option>
        <option value="arb">Arabe</option>
      </select>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">
        <input
          className="border p-2 outline-none rounded-md"
          type="text"
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Veuillez saisir le nom du prolexeme"]
          }
          id="prolexeme"
          name="prolexeme"
          value={inputs.prolexeme}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">
        <input
          className="border p-2 outline-none rounded-md"
          type="text"
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Veuillez saisir la source"]
          }
          id="source"
          name="source"
          value={inputs.source}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">
        <input
          className="border p-2 outline-none rounded-md"
          type="text"
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Veuillez saisir le Numéro pivot"]
          }
          id="Num_pivot"
          name="Num_pivot"
          value={inputs.Num_pivot}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">
        <select
          name="Type"
          className="border p-2 outline-none rounded-md"
          value={inputs.Type}
          onChange={handleChange}
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Type"]
          }
        >
          {types
            ? types.map((e) => <option value={e[0]}>{e[0]}</option>)
            : null}
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">
        <select
          name="Existance"
          className="border p-2 outline-none rounded-md"
          value={inputs.Existance}
          onChange={handleChange}
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Existance"]
          }
        >
          {existances
            ? existances.map((e) => <option value={e[0]}>{e[0]}</option>)
            : null}
        </select>
      </div>

      <div className="flex flex-col gap-2 sm:w-[40%] w-full">

        <select
          className="border p-2 outline-none rounded-md"
          value={inputs.Notorite}
          onChange={handleChange}
          name="Notorite"
          placeholder={
            localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Notorite"]
          }
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <button
        className="bg-gradient-to-r from-blue-600 to-cyan-600 sm:w-[50%] text-white font-bold rounded-md h-[5vh] sm:max-w-max px-[10vh] w-[100%]"
        onClick={addData}
      >
        {localStorage.getItem("lan") &&
          data_json[localStorage.getItem("lan")]["ajouter"]}
      </button>
    </div>
  );
};

export default Add;
