import axios from "axios";
import React, { useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import data_json from "../translate.json";

const TopNot = () => {
  const [lang, setLang] = useState(localStorage.lan);
  const [type, setType] = useState("Célébrité");
  const [year, setYear] = useState("2023");
  const [frequency, setFrequency] = useState(1);
  const [limit, setLimit] = useState(10);
  const [resp, setResp] = useState(null);

  const search = async () => {
    const data = await axios.post("http://127.0.0.1:5000/topnotority", {
      language: lang,
      year: parseInt(year),
      limit: parseInt(limit),
      type: type,
      frequency:frequency
    });
    setResp(data.data.results);
  };
  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      search();
    }}

  return (
    <div className="flex min-h-[90vh] sm:flex-row flex-col">
      <div className="flex flex-col flex-[2] p-4 gap-8 border-r">
        <div className="w-[100%] ">
          <div className="mb-1 p- font-bold">
            {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "Choisir la langue de recherche"
              ]}
          </div>

          <select
            className="p-1 outline-none w-[100%] rounded-md border"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="fra">Francais</option>
            <option value="eng">Englais</option>
            <option value="arb">Arabe</option>
          </select>
        </div>

        <div className="w-[100%]">
          <input
            className="px-4 py-2 outline-none border w-full rounded-md"
            placeholder={localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "type"
              ]}
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>

        <div className="w-[100%]">
          <select
            className="px-4 py-2 outline-none border w-full rounded-md"
            placeholder="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            onKeyUp={handleKeyUp}
          >
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>

        <div className="w-[100%]">
          <input
            className="px-4 py-2 outline-none border w-full rounded-md"
            
            placeholder={localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "nombre des celebrite a afficher"
              ]}
            type="text"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>


        <div className="w-[100%]">
          <input
            className="px-4 py-2 outline-none border w-full rounded-md"
            
            placeholder={localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "frequence"
              ]}
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          />
        </div>

        <button
          onClick={search}
          className=" rounded-md p-2 w-full text-white tracking-widest font-bold bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          {localStorage.getItem("lan") &&
              data_json[localStorage.getItem("lan")][
                "recherche"
              ]}
        </button>
      </div>

      <div className="flex-[7] p-4">
        {resp ? (
          <div className="p-2 text-blue-600 font-bold">
            Les {limit} {type} les plus notoriétaire en {year}{" "}
          </div>
        ) : null}
        {resp ? (
          resp.map((e, index) => {
            return (
              <div className="flex gap-4 p-2" key={index}>
                <div>{e[0]}</div>
                <div>{e[1]}</div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col gap-8 items-center justify-center h-full">
            <div className="text-3xl font-bold text-blue-500">
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["Prolexbase"]}
            </div>
            <div className="text-xl font-bold text-blue-500">
              {localStorage.getItem("lan") &&
                data_json[localStorage.getItem("lan")]["Top Célébrité"]}
            </div>

            <div className="flex items-center justify-between w-[70%]">
              <div className="flex flex-col gap-3 items-center h-full">
                <img className="h-[100px]" src={img1} alt="" />
              </div>

              <div className="flex flex-col gap-3 items-center h-full">
                <img className="h-[100px]" src={img2} alt="" />
              </div>

              <div className="flex flex-col gap-3 items-center h-full">
                <img className="h-[100px]" src={img3} alt="" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNot;
