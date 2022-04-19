import React, { useState, useEffect, useRef } from "react";

import "./ProfileStyle.scss";

import { RiArrowDropDownLine } from "react-icons/ri";

import imgProfil from "./../../../assets/images/default_profile_pic1.jpg";

const username = "username";

const Profile = (props) => {
  const [clicked, setClicked] = useState("");
  let profileMenuRef = useRef();

  const handleClick = () => {
    clicked ? setClicked("") : setClicked("profile active");
  };

  useEffect(() => {
    let handlerClickOutside = (e) => {
      if (!profileMenuRef.current.contains(e.target)) {
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
      className={clicked || "profile"}
      onClick={handleClick}
      ref={profileMenuRef}
    >
      <img className="pic" src={imgProfil} />
      <div className="profile--text">
        <h1 className="username">{username}</h1>
        <h1 className="rank">rank</h1>
      </div>
      <RiArrowDropDownLine className="arrowDropDown" />
      {clicked && props.children}
    </div>
  );
};

export default Profile;
