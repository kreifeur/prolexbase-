import axios from "axios";
import React, { useState } from "react";
import data_json from "../translate.json";

const Pivot = () => {
  const [langue, setLangue] = useState(localStorage.lan);
  const [check, setcheck] = useState({
    synonymy: false,
    meronymy: false,
    accessibility: false,
    newpivot: "",
  });
  const [synonym, setSynonym] = useState("");
  const [myronym, setMyronym] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [numpivot, setNumpivot] = useState("");
  const [updata, setUpdata] = useState({
    prolexeme_arb: "",
    prolexeme_fra: "",
    prolexeme_eng: "",
    source_arb: "",
    source_fra: "",
    source_eng: "",
    type: "",
    existance: "",
    notoriete_arb: "",
    notoriete_fra: "",
    notoriete_eng: "",
    langue: "",
  });

  const [existingItems, setExistingItems] = useState([]);

  const getpivots = async () => {
    const res = await axios.get("http://127.0.0.1:5000/getpivots");
    setExistingItems(res.data.pivots);
  };

  useState(() => {
    getpivots();
  }, []);
  const [message, setMessage] = useState("");

  const verifyPivot = (newpivot) => {
    if (existingItems.includes(Number(newpivot)) || newpivot == "") {
      /* setMessage(`The item '${newpivot}' exists in the list.`); */
      setMessage("");
    } else {
      setMessage(`The pivot '${newpivot}' does not exist.`);
    }
  };

  const addpivot = async () => {
    const res = await axios.post("http://127.0.0.1:5000/addpivot", {
      token: localStorage.token,
      ...updata,
      numpivot: numpivot,
    });
    alert(res.data.message);
  };
  /* updatepivot */
  const updatepivot = async () => {
    const res = await axios.post("http://127.0.0.1:5000/updatepivot", {
      token: localStorage.token,
      ...updata,
      numpivot: numpivot,
    });
    alert(res.data.message);
  };

  const ajouter = async () => {
    const res = await axios.post("http://127.0.0.1:5000/ajouter", {
      token: localStorage.token,
      ...check,
      numpivot: numpivot,
    });
  };

  const modifier = async () => {
    setUpdata({
      prolexeme_arb: "",
      prolexeme_fra: "",
      prolexeme_eng: "",
      source_arb: "",
      source_fra: "",
      source_eng: "",
      type: "",
      existance: "",
      notoriete_arb: "",
      notoriete_fra: "",
      notoriete_eng: "",
      langue: "",
    });
    setAccessibility("");
    setMyronym("");
    setSynonym("");
    const res = await axios.post("http://127.0.0.1:5000/getpivot", {
      token: localStorage.token,
      numpivot: numpivot,
      langue: langue,
    });
    setSynonym(res.data.synonym);
    setMyronym(res.data.meronymy);
    setAccessibility(res.data.accessibility);
    setUpdata({
      prolexeme_arb: res.data.res[13] ? res.data.res[13] : "",
      prolexeme_fra: res.data.res[19] ? res.data.res[19] : "",
      prolexeme_eng: res.data.res[25] ? res.data.res[25] : "",
      source_arb: res.data.res[17] ? res.data.res[17] : "",
      source_fra: res.data.res[23] ? res.data.res[23] : "",
      source_eng: res.data.res[29] ? res.data.res[29] : "",
      type: res.data.res[4] ? res.data.res[4] : "",
      existance: res.data.res[9] ? res.data.res[9] : "",
      notoriete_arb: res.data.res[16] ? res.data.res[16] : "",
      notoriete_fra: res.data.res[22] ? res.data.res[22] : "",
      notoriete_eng: res.data.res[28] ? res.data.res[28] : "",
      langue: res.data.res[4] ? res.data.res[4] : "",
    });
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-10 ">
        <div className="sm:w-[70%] w-full flex flex-col gap-3">
          <select
            className="p-1 outline-none  border rounded-md  w-full sm:w-[300px]"
            value={langue}
            onChange={(e) => setLangue(e.target.value)}
          >
            <option value="fra">Francais</option>
            <option value="eng">Englais</option>
            <option value="arb">Arabe</option>
          </select>

          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["num pivot"]}{" "}
              :
            </div>
            <input
              value={numpivot}
              onChange={(e) => setNumpivot(e.target.value)}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />

            <button
              className="px-2 py-1 bg-blue-500 text-white font-bold w-full sm:w-[150px]"
              onClick={modifier}
            >
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["recherche"]}
            </button>
            {window.localStorage.getItem("token") ? 
            <button
              className="px-2 py-1 bg-blue-500 text-white font-bold w-full sm:w-[150px]"
              onClick={addpivot}
            >
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["ajouter"]}
            </button>:null}
            {window.localStorage.getItem("token") ? 
            <button
              className="px-2 py-1 bg-blue-500 text-white font-bold w-full sm:w-[150px]"
              onClick={updatepivot}
            >
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["modifier"]}
            </button>:null}
          </div>
          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["prolexeme"]}{" "}
              :
            </div>
            <input
              onChange={(e) =>
                setUpdata({ ...updata, prolexeme_fra: e.target.value })
              }
              value={updata.prolexeme_fra}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
            <input
              onChange={(e) =>
                setUpdata({ ...updata, prolexeme_arb: e.target.value })
              }
              value={updata.prolexeme_arb}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
            <input
              onChange={(e) =>
                setUpdata({ ...updata, prolexeme_eng: e.target.value })
              }
              value={updata.prolexeme_eng}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
          </div>
          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["Source"]}{" "}
              :
            </div>
            <input
              onChange={(e) =>
                setUpdata({ ...updata, source_fra: e.target.value })
              }
              value={updata.source_fra}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
            <input
              onChange={(e) =>
                setUpdata({ ...updata, source_arb: e.target.value })
              }
              value={updata.source_arb}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
            <input
              onChange={(e) =>
                setUpdata({ ...updata, source_eng: e.target.value })
              }
              value={updata.source_eng}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
          </div>
          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["existence"]}{" "}
              :
            </div>
            <input
              onChange={(e) =>
                setUpdata({ ...updata, existance: e.target.value })
              }
              value={updata.existance}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
          </div>

          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["type"]}{" "}
              :
            </div>
            
            <input
              onChange={(e) => setUpdata({ ...updata, type: e.target.value })}
              value={updata.type}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
          </div>
          <div className="flex gap-2 items-center flex-col sm:flex-row ">
            <div>
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["notoriété"]}{" "}
              :
            </div>
            <div>Fr :</div>
            <input
              onChange={(e) =>
                setUpdata({ ...updata, notoriete_fra: e.target.value })
              }
              value={updata.notoriete_fra}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />

            <div>Arb :</div>

            <input
              onChange={(e) =>
                setUpdata({ ...updata, notoriete_arb: e.target.value })
              }
              value={updata.notoriete_arb}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />

            <div>Eng :</div>
            <input
              onChange={(e) =>
                setUpdata({ ...updata, notoriete_eng: e.target.value })
              }
              value={updata.notoriete_eng}
              className="p-1 border rounded-md outline-none w-full sm:w-[150px] "
              type="text"
            />
          </div>
        </div>

        {window.localStorage.getItem("token") ? 
        <div className="sm:w-[30%] w-full flex flex-col gap-3">
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Mettre en relation de"]}
          <div className="flex items-center gap-2">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["synonymes"]}{" "}
            <input
              className="cursor-pointer"
              checked={check.synonymy}
              onClick={() => setcheck({ ...check, synonymy: !check.synonymy })}
              onChange={() => {}}
              type="checkbox"
              name=""
              id=""
            />{" "}
          </div>
          <div className="flex items-center gap-2">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["meronymes"]}{" "}
            <input
              className="cursor-pointer"
              checked={check.meronymy}
              onChange={() => {}}
              onClick={() => setcheck({ ...check, meronymy: !check.meronymy })}
              type="checkbox"
              name=""
              id=""
            />{" "}
          </div>
          <div className="flex items-center gap-2">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["accessibilité"]}{" "}
            <input
              onChange={() => {}}
              className="cursor-pointer"
              checked={check.accessibility}
              onClick={() =>
                setcheck({ ...check, accessibility: !check.accessibility })
              }
              type="checkbox"
              name=""
              id=""
            />{" "}
          </div>
          <div className="flex flex-col gap-1">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["Avec le pivot"]}

            <input
              value={check.newpivot}
              onChange={(e) => {
                setcheck({ ...check, newpivot: e.target.value });
                verifyPivot(e.target.value);
              }}
              className="p-1 border rounded-md outline-none w-full "
              type="text"
            />
            <p className="text-xs text-red-700">{message}</p>
          </div>
          <button
            className="px-2 py-1 bg-blue-500 text-white font-bold w-full"
            onClick={ajouter}
          >
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["Ajouter relation(s)"]}
          </button>
        </div>:null}
      </div>

      <div className="flex flex-col gap-2 mt-4 ">
        <div>
          {localStorage.getItem("lan") &&
            data_json[localStorage.getItem("lan")]["Afficher Relation"]}{" "}
          :
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl text-blue-600">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["synonymes"]}
          </div>
          {synonym != "" &&
            synonym.map((e, index) => <div key={index}>{e[0]}</div>)}
          <div className="text-xl text-blue-600">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["meronymes"]}
          </div>
          {myronym != "" &&
            myronym.map((e, index) => <div key={index}>{e[6]}</div>)}
          <div className="text-xl text-blue-600">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["accessibilité"]}
          </div>
          {accessibility != "" &&
            accessibility.map((e, index) => <div key={index}>{e[8]}</div>)}
        </div>
      </div>
    </div>
  );
};

export default Pivot;
