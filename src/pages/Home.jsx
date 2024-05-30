import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const result = await axios.get("http://127.0.0.1:5000/");
    setData(result.data.results);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="min-h-[100%]">
      <div className="flex flex-col">
        {data.map((e) => {
          return (
            <ul className="p-4 flex items-center gap-[100px] justify-between border-b" key={e[0]}>
              <li>{e[1]}</li>
              <li>{e[2]}</li>
              <li>{e[3]}</li>
              <li>{e[4]}</li>
              <li>{e[5]}</li>
            </ul>
           
          );
        })}
      </div>
    </div>
  );
};

export default Home;
