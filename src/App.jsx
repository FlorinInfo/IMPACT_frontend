import { Routes, Route, Link } from "react-router-dom";

import "./App.scss";
import { Test } from "./components/TestComponent/TestComponent";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const [cookies, setCookie] = useCookies(["token"]);

  function setCookieBtn() {
    setCookie("token", "1234", { path: "/" });
  }

  return (
    <div className="App">
      <button onClick={setCookieBtn}>Test</button>
      <Routes>
        <Route path="/login" element={<Test />} />
      </Routes>
    </div>
  );
}

export default App;
