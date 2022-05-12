import React from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import "./DropDownMenuProfile.scss";

import { IoSettingsOutline } from "react-icons/io5";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

import { ImpactStore } from "../../../store/ImpactStore";

const DropDownMenuProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { user, setUser } = useContext(ImpactStore);

  const logOut = () => {
    removeCookie("token");
    removeCookie("zoneRole");
    removeCookie("zoneRoleOn");
    removeCookie("countyId");
    removeCookie("villageId");
    removeCookie("localityId");
    removeCookie("admin");
    setUser({});
    navigate("/");
    // return;
  };
  const handleSelectedAction = (e) => {
    e.preventDefault();
    const action = e.target.closest(".menu-item__profile").id;

    if (action === "log-out") logOut();
    else if (action === "profile") navigate(`/user/${user.id}`);
  };

  function DropDownItemProfile(props) {
    return (
      <a className="menu-item__profile" id={props.action}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  console.log(user.zoneRole);
  //adaptare mobile menu in functie de tip de utilizator
  let adaptiveClassName;

  user.zoneRole === "CETATEAN" && !user.admin
    ? (adaptiveClassName = "dropdown__profile citizen")
    : (adaptiveClassName = `dropdown__profile`);

  if (adaptiveClassName === "dropdown__profile")
    user.zoneRole === "MODERATOR"
      ? (adaptiveClassName = "dropdown__profile moderator")
      : (adaptiveClassName = `dropdown__profile`);

  return (
    <div className={adaptiveClassName} onClick={handleSelectedAction}>
      <DropDownItemProfile
        leftIcon={<CgProfile className="icon-left__profile" />}
        action="profile"
      >
        <span className="menu-item-text__profile">Profil</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<IoSettingsOutline className="icon-left__profile" />}
        action="settings"
      >
        <span className="menu-item-text__profile">Setări</span>
      </DropDownItemProfile>
      {/* <DropDownItemProfile
        leftIcon={<GiLevelThreeAdvanced className="icon-left__profile" />}
        action="rank"
      >
        <span className="menu-item-text__profile">Rank</span>
      </DropDownItemProfile> */}
      {/* <DropDownItemProfile
        leftIcon={<IoMdContact className="icon-left__profile" />}
        action="contact"
      >
        <span className="menu-item-text__profile">Contact</span>
      </DropDownItemProfile> */}
      <DropDownItemProfile
        leftIcon={<BiLogOut className="icon-left__profile" />}
        action="log-out"
      >
        <span className="menu-item-text__profile">Log out</span>
      </DropDownItemProfile>
    </div>
  );
};

export default DropDownMenuProfile;
