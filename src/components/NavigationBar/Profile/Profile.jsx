import React, { useState } from "react";
import "./ProfileStyle.scss";

import { RiArrowDropDownLine } from "react-icons/ri";

import imgProfil from "./../../../assets/images/default_profile_pic1.jpg";

const username = "username";

const Profile = (props) => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState("");

  const handleClick = () => {
    clicked ? setClicked("") : setClicked("profile active");
  };

  return (
    // <div className="profile" onClick={() => setOpen(!open)}>
    <div className={clicked || "profile"} onClick={handleClick}>
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
