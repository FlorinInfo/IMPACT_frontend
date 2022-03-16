import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import Pending from "./Pages/Pending/Pending";
import { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate , useLocation} from "react-router-dom";

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "userid"]);

  // useEffect(() => { 
  //   if ((!cookies.token || !cookies.userid)&&(location.pathname!="/login"&&location.pathname!="/signup")) navigate("/login");
  // }, [cookies.token, cookies.userid]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </div>
  );
}

export default App;
