import axios from "axios";
import React, { useState } from "react";

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
    const res = await axios.post(
      "http://127.0.0.1:5000/deleteprolexeme",
      {...inputs,token:localStorage.token,}
    );
    setInputs({
      langue: localStorage.lan,
      prolexeme: "",
    });
    setUpdata({
      num_pivot: "",
      type: "",
      existance: "",
      notoriete: "",
      source: "",
      prolexeme_1: "",
      prolexeme_2: "",
    });
  };

  const updateit = async () => {
    const res = await axios.post("http://127.0.0.1:5000/updateprolexeme", {
      token:localStorage.token,
      ...updata,
      ...inputs,
    });
  };
  return (
    <div className="flex flex-col gap-3">
      <select
        className="p-1 outline-none  border rounded-md"
        value={inputs.langue}
        onChange={(e) => setInputs({ ...inputs, langue: e.target.value })}
      >
        <option value="fra">Francais</option>
        <option value="eng">Englais</option>
        <option value="arb">Arabe</option>
      </select>
      <div className="flex gap-2 items-center ">
        <div>Prolexeme :</div>
        <input
          value={inputs.prolexeme}
          onChange={(e) => setInputs({ ...inputs, prolexeme: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
        <button
          className="px-4 py-1 bg-orange-400 text-white font-bold"
          onClick={getprolexeme}
        >
          modifier
        </button>
        <button
          className="px-4 py-1 bg-red-700 text-white font-bold"
          onClick={deleteprolexeme}
        >
          delete
        </button>
      </div>

      <div className="flex gap-2 items-center ">
        <div>Num pivot : </div>
        <input
          value={updata.num_pivot}
          onChange={(e) => setUpdata({ ...updata, num_pivot: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center ">
        <div>Type :</div>
        <input
          value={updata.type}
          onChange={(e) => setUpdata({ ...updata, type: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center ">
        <div>Existance :</div>
        <input
          value={updata.existance}
          onChange={(e) => setUpdata({ ...updata, existance: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center ">
        <div>Notoriete :</div>
        <input
          value={updata.notoriete}
          onChange={(e) => setUpdata({ ...updata, notoriete: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>

      <div className="flex gap-2 items-center ">
        <div>Source :</div>
        <input
          value={updata.source}
          onChange={(e) => setUpdata({ ...updata, source: e.target.value })}
          className="p-1 border rounded-md outline-none"
          type="text"
        />
      </div>

      <div>
        <div>Prolexeme dans d'autres langues</div>
        <div>{updata.prolexeme_1}</div>
        <div>{updata.prolexeme_2}</div>
      </div>

      <button className="px-2 py-1 bg-blue-500 text-white font-bold" onClick={updateit}>update it</button>
    </div>
  );
};

export default Prolexeme;
