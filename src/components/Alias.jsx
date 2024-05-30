import axios from "axios";
import React, { useState } from "react";

const Alias = () => {
  const [alias, setAlias] = useState([]);
  const [langue,setLangue]=useState(localStorage.lan)
  const [updata, setUpdata] = useState({
    alias: "",
  });
  const [prolexeme, setProlexeme] = useState("");
  const modifier = async () => {
    setUpdata({
      id_alias: "",
      alias: "",
    });
    const res = await axios.post("http://127.0.0.1:5000/getalias", {
      prolexeme: prolexeme,
      langue: langue
    });
    setAlias(res.data.res);
  };

  const ajouter = async () => {
    const res = await axios.post("http://127.0.0.1:5000/ajouteralias", {
      ...updata,
      langue: langue,
      prolexeme: prolexeme,
    });
    modifier();
  };

  const update = async (item) => {
    const res = await axios.post("http://127.0.0.1:5000/modifieralias", {
      langue: langue,
      id_alias: item[6],
      alias: item[7],
      prolexeme: prolexeme,
    });

  };

  const deletealias = async (item) => {
    const res = await axios.post("http://127.0.0.1:5000/deletealias", {
      langue: langue,
      id_alias: item[6],
      alias: item[7],
    });
    
    modifier();
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center ">
      <div>langue :</div>
        <select
          className="p-1 outline-none  border rounded-md"
          value={langue}
          onChange={(e) => setLangue(e.target.value)}
        >
          <option value="fra">Francais</option>
          <option value="eng">Englais</option>
          <option value="arb">Arabe</option>
        </select>
      </div>


      <div className="flex gap-2 items-center ">
        <div>Prolexeme :</div>
        <input
          value={prolexeme}
          onChange={(e) => setProlexeme(e.target.value)}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>
      
      <div className="flex flex-col gap-4  ">
        <div>Alias :</div>
        <button className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={modifier}>modifier</button>
        <input
          className="border py-1 px-4 "
          value={updata.alias}
          onChange={(e) => setUpdata({ ...updata, alias: e.target.value })}
          type="text"
          name=""
          id=""
        />
        <button className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={ajouter}>ajouter</button>

        {alias.map((item, index) => {
          return (
            <div key={index} className="flex gap-8">
              <input
                type="text"
                value={item[7]}
                onChange={(e) => {
                  let newArray = [...alias];
                  newArray[index][7] = e.target.value;
                  setAlias(newArray);
                }}
                rows={10}
                name=""
                id=""
                className="p-1 border rounded-md outline-none"
              ></input>
              <div className="flex items-center gap-5">
                <button className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={() => update(item)}>update</button>
                <button className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={() => deletealias(item)}>delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alias;
