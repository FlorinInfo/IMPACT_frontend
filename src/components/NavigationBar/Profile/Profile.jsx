import React, { useState, useEffect, useRef, useContext } from "react";

import "./ProfileStyle.scss";

import { RiArrowDropDownLine } from "react-icons/ri";

import imgProfil from "./../../../assets/images/default_profile_pic1.jpg";
import { ImpactStore } from "../../../store/ImpactStore";
import rankPerform from "../../../utils/rank";


const Profile = (props) => {
  const { user, setUser } = useContext(ImpactStore);
  const [clicked, setClicked] = useState("");
  let profileMenuRef = useRef();
  const [rank, setRank] = useState(
    user.monthlyPoints ?()=>rankPerform(user.monthlyPoints, user.zoneRole, user.admin) : {
      type:"Cetatean",
      color:"black",
      image:"default.jpg"
    }
  );


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
      <img className="pic" src={require(`../../../assets/images/ranks/${rank.image}`)} />
      <div className="profile--text">
        <h1 className="username">{user.firstName} {user.lastName}</h1>
        <h1 className="rank">{rank.type}</h1>
      </div>
      <RiArrowDropDownLine className="arrowDropDown" />
      {clicked && props.children}
    </div>
  );
};

export default Profile;
