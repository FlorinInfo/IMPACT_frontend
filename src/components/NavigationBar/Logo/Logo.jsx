import React from "react";
import { useNavigate } from "react-router-dom";

import "./LogoStyles.scss";

import srcLogo from "../../../assets/images/logo-blackx.svg";
// schimbare
const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="logo"
      onClick={() => {
        navigate("/");
      }}
    >
      <img className="logo--img" src={srcLogo} />
    </div>
  );
};

export default Logo;
