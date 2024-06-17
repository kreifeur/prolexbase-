import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdvancedSearch from "./components/AdvancedSearch";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Add from "./components/Add";
import Login from "./pages/Login";
import TopNot from "./components/TopNot";
import FileUpload from "./components/File";
import Bienvenue from "./pages/Bienvenue";
import Consultation from "./components/Consultation";
import { useEffect } from "react";

const App = () => {
  const currentUser = window.localStorage.token;
  useEffect(() => {
    if (!localStorage.getItem("lan")) {
      localStorage.setItem("lan", "fra");
    }
  }, []);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to={"/"} />;
  };
  return (
    <div className="w-[100%] min-h-[100vh]  text-sm ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Bienvenue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recherche" element={<Main />} />

          <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
          <Route path="/topnot" element={<TopNot />} />
          <Route
            path="/add"
            element={
              <RequireAuth>
                <Add />
              </RequireAuth>
            }
          />
          <Route
            path="/consultation"
            element={
              <RequireAuth>
                <Consultation />
              </RequireAuth>
            }
          />
          <Route
            path="/file"
            element={
              <RequireAuth>
                <FileUpload />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Home/>  */}
    </div>
  );
};

export default App;
