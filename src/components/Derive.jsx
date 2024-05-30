import axios from "axios";
import React, { useState } from "react";

const derive = () => {
  const [derive, setderive] = useState([]);
  const [langue, setLangue] = useState(localStorage.lan);
  const [updata, setUpdata] = useState({
    derive: "",
  });
  const [prolexeme, setProlexeme] = useState("");
  const modifier = async () => {
    setUpdata({
      id_derive: "",
      derive: "",
    });
    const res = await axios.post("http://127.0.0.1:5000/getderive", {token:localStorage.token,
      prolexeme: prolexeme,
      langue: langue,
    });
    setderive(res.data.res);
  };

  const ajouter = async () => {
    const res = await axios.post("http://127.0.0.1:5000/ajouterderive", {token:localStorage.token,
      ...updata,
      prolexeme: prolexeme,
      langue: langue,
    });
    
    modifier();
  };

  const update = async (item) => {
    const res = await axios.post("http://127.0.0.1:5000/modifierderive", {token:localStorage.token,
      id_derive: item[6],
      derive: item[7],
      prolexeme: prolexeme,
      langue: langue,
    });
    
  };

  const deletederive = async (item) => {
    const res = await axios.post("http://127.0.0.1:5000/deletederive", {token:localStorage.token,
      id_derive: item[6],
      derive: item[7],
      langue: langue,
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
        <div>derive :</div>
        <button  className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={modifier}>modifier</button>
        <input
          className="border py-1 px-4 "
          value={updata.derive}
          onChange={(e) => setUpdata({ ...updata, derive: e.target.value })}
          type="text"
          name=""
          id=""
        />
        <button  className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={ajouter}>ajouter</button>

        {derive.map((item, index) => {
          return (
            <div key={index} className="flex gap-8">
              <input
                type="text"
                value={item[7]}
                onChange={(e) => {
                  let newArray = [...derive];
                  newArray[index][7] = e.target.value;
                  setderive(newArray);
                }}
                rows={10}
                name=""
                id=""
                className="p-1 border rounded-md outline-none"
              ></input>
              <div className="flex items-center gap-5">
                <button  className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={() => update(item)}>update</button>
                <button  className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={() => deletederive(item)}>delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default derive;
