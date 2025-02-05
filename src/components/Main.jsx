import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IoSearch } from "react-icons/io5";
import { FaSearchPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import pays from "../assets/pays.jpg";
import nom from "../assets/nom.jpg";
import prenom from "../assets/prenom.jpg";
import data_json from "../translate.json";

const Main = () => {
  const [more, setMore] = useState(false);
  const [inputs, setInputs] = useState({
    language: localStorage.lan,
    word: null,
    token: window.localStorage.getItem("token"),
  });
  const [synonymy, SetSynonymy] = useState();
  const [accessibility, SetAccessibility] = useState();
  const [meronymy, setMeronymy] = useState();
  const [data, setData] = useState();
  const [noto, setNoto] = useState();
  const [error, setError] = useState("");
  const [exist, setExist] = useState("");

  const fetchdata = async () => {
    const res = await axios.post("http://127.0.0.1:5000/find", inputs);
    setExist(res.data.exist);
    setData(res.data.results[0]);
    setNoto(res.data.notority);
    SetSynonymy(res.data.synonymy);
    setMeronymy(res.data.meronymy);
    SetAccessibility(res.data.accessibility);
  };

  const send = () => {
    fetchdata();
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      send();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputs({ ...inputs, word: value });

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
    <div className="flex min-h-[90vh] sm:flex-row flex-col">
      {/* SIDEBAR */}
      <div className="flex-[2] flex flex-col items-center p-4 gap-8 sm:border-r border-b">
        <div className="w-[90%]">
          <div className="mb-1 p-1 font-bold">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "Choisir la langue de recherche"
              ]}
          </div>
          <select
            className="p-1 outline-none w-full border rounded-md"
            value={inputs.language}
            onChange={(e) => setInputs({ ...inputs, language: e.target.value })}
          >
            <option value="eng">Englais</option>
            <option value="fra">Francais</option>
            <option value="arb">Arabe</option>
          </select>
        </div>

        <div className=" w-[90%]">
          <div className="mb-1 p-1 font-bold">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "Entrer le nom propre à rechercher"
              ]}
          </div>
          <input
            onChange={handleInputChange}
            className="border p-2 outline-none w-full rounded-md"
            type="text"
            onKeyUp={handleKeyUp}
          />
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>

        <div className="w-[90%]">
          <button
            type="submit"
            onClick={send}
            className=" rounded-md p-2 w-full text-white tracking-widest font-bold bg-gradient-to-r from-blue-600 to-cyan-600"
          >
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")]["recherche"]}
          </button>
        </div>
      </div>

      {/* Main window */}

      <div className="flex-[7] p-4 w-full">
        {data ? (
          exist != "" ? (
            <div>
              {" "}
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")][
                  "le prolexeme n existe pas"
                ]}
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-full ">
              {" "}
              <div className="font-bold text-xl px-[5vh] py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white max-w-max rounded-md">
                {data[1]}
              </div>{" "}
              <div className="p-2 border-2 border-blue-600 text-blue-600 font-bold flex flex-col gap-2">
                <div>
                  Type : <span>{data[4]}</span>
                </div>
                <div>
                  Existence : <span>{data[5]}</span>
                </div>
                <div>
                  NUM_FREQUENCY : <span>{data[2]}</span>
                </div>
                <div className="flex gap-4">
                  WIKIPEDIA_LINK
                  <span>
                    <a
                      target="_blank"
                      className="flex items-center gap-4"
                      href={`https://${inputs.language.slice(
                        0,
                        2
                      )}.wikipedia.org/wiki/${data[3]}`}
                    >
                      {" "}
                      {data[3]} <BiLinkExternal />
                    </a>
                  </span>
                </div>
                <div>
                  SYNONYMY :
                  <div>
                    {synonymy.map((e, index) => {
                      return (
                        <div key={index} className="text-black font-normal">
                          {e}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className="cursor-pointer text-right"
                  onClick={() => setMore(!more)}
                >
                  {more ? "hide" : "see more"}
                </div>

                <div
                  className={`${
                    more == false ? "hidden" : "flex flex-col gap-2"
                  }`}
                >
                  <div>meronymy :</div>
                  <div>
                    {meronymy &&
                      meronymy.map((e, index) => {
                        return (
                          <div key={index} className=" text-black font-normal">
                            {e}
                          </div>
                        );
                      })}
                  </div>

                  <div>accessibility :</div>
                  <div>
                    {accessibility &&
                      accessibility.map((e, index) => {
                        return (
                          <div key={index} className="text-black font-normal">
                            {e}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              {/*  {noto
              ? noto.map((e,index) => (
                  <div c key={index}lassName="flex">
                    <div>Notority {e['year']} : </div>
                    <div>{e['noto']}</div>
                  </div>
                ))
              : null} */}
              {/* graph area  */}
              <div className="my-10 w-full">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={noto}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#0891b2"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="noto"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col gap-[10vh] items-center justify-center h-full">
            <div className="text-3xl font-bold text-blue-500">
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["Prolexbase"]}
            </div>
            <div className="sm:w-[80%] w-[100%] flex items-center h-[6vh]">
              <div className="h-full w-[10%] sm:w-[5%] flex items-center justify-center border border-blue-500 bg-blue-500 cursor-pointer">
                <IoSearch onClick={send} className=" text-xl text-white" />
              </div>

              <input
                onChange={handleInputChange}
                className="border border-blue-500 w-[50%] sm:w-[70%] h-full outline-none px-3"
                placeholder={`${
                  localStorage.getItem("lan") &&
                  data_json[localStorage.getItem("lan")][
                    "Entrer le nom propre à rechercher"
                  ]
                }`}
                type="text"
                onKeyUp={handleKeyUp}
              />
              <Link
                to="/AdvancedSearch"
                className="h-full w-[40%] sm:w-[25%] flex items-center justify-center border border-blue-500 bg-blue-500 text-white gap-2"
              >
                <FaSearchPlus className=" text-md " />
                {localStorage.getItem("lan") &&
                  data_json[localStorage.getItem("lan")]["recherche avancé"]}
              </Link>
            </div>

            <div className="flex items-center justify-between w-[100%] sm:w-[70%] px-4">
              <div className="flex flex-col items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md">un pays</div>
                <img className="h-[60px]" src={pays} alt="" />
                <div className="text-xl text-blue-500 ">France</div>
              </div>

              <div className="flex flex-col items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md">un nom</div>
                <img className="h-[60px]" src={nom} alt="" />
                <div className="text-xl text-blue-500 ">Ninou</div>
              </div>

              <div className="flex flex-col items-center h-full justify-between">
                <div className="px-3 py-1 border rounded-md">un prénom</div>
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

export default Main;
