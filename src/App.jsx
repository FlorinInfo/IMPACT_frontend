import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import SignUp from "./Pages/SignUp/SignUp";
import Homepage from "./Pages/Homepage/Homepage";
import Login from "./Pages/Login/Login";
import Pending from "./Pages/Pending/Pending";
import WaitingList from "./Pages/WaitingList/WaitingList";
import { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Admins from "./Pages/Admins/Admins";
import CreatePost from "./Pages/CreatePost/CreatePost";

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if ((!cookies.token)&&(location.pathname!="/login"&&location.pathname!="/signup")) navigate("/login");
  }, [cookies.token]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/create-admins" element={<Admins />}></Route>
        <Route path="/waiting-list" element={<WaitingList />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
      </Routes>
    </div>
  );
}

export default App;
