import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [error,setError] = useState(null)
  const [log, setLog] = useState({
    username: "",
    password: "",
  });
  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:5000/login", log)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        window.location.replace("/");
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-[30%] h-[50vh] bg-white flex flex-col items-center justify-between p-8 shadow-xl">
        <div className="text-xl font-bold ">LOGIN</div>
        <input onChange={(e)=>setLog({...log , username:e.target.value})} className="px-4 py-2 bg-gray-100 w-full outline-none" placeholder="User Name" type="text"  />
        <input onChange={(e)=>setLog({...log , password:e.target.value})} className="px-4 py-2 bg-gray-100 w-full outline-none" placeholder="Password" type="password" />
        {error ? <div className="text-red-700">{error}</div>: null}
        <button className="px-4 py-2 w-[200px] bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold" onClick={() => handleLogin()}>Login Now</button>
      </div>
    </div>
  );
};

export default Login;
