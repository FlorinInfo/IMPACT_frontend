import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "userid"]);

  useEffect(() => {
    if (!cookies.token || !cookies.userid) navigate("/login");
  }, [cookies.token, cookies.userid]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
