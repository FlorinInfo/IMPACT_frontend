import React, { useState, useEffect, useRef } from "react";

import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiArrowDropDownLine } from "react-icons/ri";

const userType = "administrator";

const Home = (props) => {
  const [clicked, setClicked] = useState("");

  const handleClick = () => {
    clicked ? setClicked("") : setClicked("home-button active");
  };

  let homeMenuRef = useRef();

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (!homeMenuRef.current.contains(e.target)) {
        setClicked("");
      }
    };
    document.addEventListener("mousedown", handlerClickOutside);

    return () => {
      document.removeEventListener("mousedown", handlerClickOutside);
    };
  });

  return (
    <div
      className="home-button__container"
      onClick={handleClick}
      ref={homeMenuRef}
    >
      <button className={clicked || "home-button"}>
        <HomeIcon className="home-button__icon" />
        <h1 className="home-button__text">Home</h1>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="home-button__arrow" />
        {clicked && props.children}
      </button>
    </div>
  );
};

export default Home;
