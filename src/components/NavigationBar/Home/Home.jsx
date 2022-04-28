import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { MdHome } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiAdminLine } from "react-icons/ri";

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

  const location = useLocation();
  let pageName = "Home";

  if (location.pathname === "/") pageName = "Home";
  else if (location.pathname === "/create-post") pageName = "Creeaza Postare";
  else if (location.pathname === "/waiting-list") pageName = "waiting-list";
  else if (location.pathname === "/users") pageName = "create-users";

  return (
    <div
      className="home-button__container"
      onClick={handleClick}
      ref={homeMenuRef}
    >
      <button className={clicked || "home-button"}>
        {(location.pathname === "/" || pageName === "Home") && (
          <HomeIcon className="home-button__icon" />
        )}
        {location.pathname === "/create-post" && (
          <IoAddSharp className="home-button__icon" />
        )}
        {location.pathname === "/waiting-list" && (
          <AiOutlineUnorderedList className="home-button__icon" />
        )}
        {location.pathname === "/users" && (
          <RiAdminLine className="home-button__icon" />
        )}
        <h1 className="home-button__text">{pageName}</h1>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="home-button__arrow" />
        {clicked && props.children}
      </button>
    </div>
  );
};

export default Home;
