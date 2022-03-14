import "./TestStyles.scss";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Test = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    if(!cookies.token) navigate("/");
  }, [cookies.token]);

  return (
    <div className="xxxx">
      <span>Test</span>
    </div>
  );
};
