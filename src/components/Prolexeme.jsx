import axios from "axios";
import React, { useState } from "react";
import data_json from '../translate.json'

const Prolexeme = () => {
  const [inputs, setInputs] = useState({
    langue: localStorage.lan,
    prolexeme: "",
  });
  const [updata, setUpdata] = useState({
    num_prolexeme: "",
    num_pivot: "",
    type: "",
    existance: "",
    notoriete: "",
    source: "",
  });
  const getprolexeme = async () => {
    const res = await axios.post("http://127.0.0.1:5000/getprolexeme", {...inputs,token:localStorage.token,});
    setUpdata({
      num_prolexeme: res.data.res[0]? res.data.res[0]:'',
      num_pivot: res.data.res[2]? res.data.res[2]:'',
      type: res.data.res[10]? res.data.res[10]:'',
      existance: res.data.res[15]? res.data.res[15]:'',
      notoriete: res.data.res[4]? res.data.res[4]:'',
      source: res.data.res[5]? res.data.res[5]:'',
      prolexeme_1: res.data.res[19]? res.data.res[19]:'',
      prolexeme_2: res.data.res[25]? res.data.res[25]:'',
    });
  };

  const deleteprolexeme = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer le prolexeme ?")) {
      const res = await axios.post(
        "http://127.0.0.1:5000/deleteprolexeme",
        { ...inputs, token: localStorage.token }
      );
      setInputs({
        langue: localStorage.lan,
        prolexeme: "",
      });
      setUpdata({
        num_prolexeme: "",
        num_pivot: "",
        type: "",
        existance: "",
        notoriete: "",
        source: "",
        prolexeme_1: "",
        prolexeme_2: "",
      });
    }
  };

  const updateit = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir modifier le prolexeme ?")) {
      const res = await axios.post("http://127.0.0.1:5000/updateprolexeme", {
        token: localStorage.token,
        ...updata,
        ...inputs,
      });
      // Vous pouvez ajouter ici un message de confirmation ou toute autre action après la modification
    }
  };
  return (
    <div className="flex flex-col gap-3">
      <select
        className="p-1 outline-none  border rounded-md sm:w-[300px]"
        value={inputs.langue}
        onChange={(e) => setInputs({ ...inputs, langue: e.target.value })}
      >
        <option value="fra">Francais</option>
        <option value="eng">Englais</option>
        <option value="arb">Arabe</option>
      </select>
      <div className="flex gap-2 items-center  sm:flex-row  flex-col">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["prolexeme"]} :</div>
        <input
          value={inputs.prolexeme}
          onChange={(e) => setInputs({ ...inputs, prolexeme: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
        <button
          className="px-4 py-1 bg-orange-400 text-white font-bold w-full sm:max-w-max rounded-sm"
          onClick={getprolexeme}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["afficher"]}
        </button>
        {window.localStorage.getItem("token") ? 
        <button
          className="px-4 py-1 bg-red-700 text-white font-bold w-full sm:max-w-max rounded-sm"
          onClick={deleteprolexeme}
        >
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["supprimer"]}
        </button>:null}
      </div>

      <div className="flex gap-2 items-center  sm:flex-row  flex-col ">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["num pivot"]} : </div>
        <input
          value={updata.num_pivot}
          onChange={(e) => setUpdata({ ...updata, num_pivot: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center  sm:flex-row  flex-col ">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["type"]} :</div>
        <input
          value={updata.type}
          onChange={(e) => setUpdata({ ...updata, type: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center  sm:flex-row  flex-col ">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["existence"]} :</div>
        <input
          value={updata.existance}
          onChange={(e) => setUpdata({ ...updata, existance: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center  sm:flex-row  flex-col ">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["notoriété"]} :</div>
        <input
          value={updata.notoriete}
          onChange={(e) => setUpdata({ ...updata, notoriete: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center  sm:flex-row  flex-col ">
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Source"]} :</div>
        <input
          value={updata.source}
          onChange={(e) => setUpdata({ ...updata, source: e.target.value })}
          className="p-1 border rounded-md outline-none sm:w-[40%] w-full"
          type="text"
        />
      </div>

      <div>
        <div>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Prolexeme dans d'autres langues"]}</div>
        <div>{updata.prolexeme_1}</div>
        <div>{updata.prolexeme_2}</div>
      </div>
      {window.localStorage.getItem("token") ? 
      <button className="px-8 py-1 bg-blue-500 text-white font-bold sm:max-w-max rounded-sm" onClick={updateit}>{localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["modifier"]}</button>:null}
    </div>
  );
};

export default Prolexeme;
