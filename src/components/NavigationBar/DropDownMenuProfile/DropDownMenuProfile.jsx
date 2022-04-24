import React from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./DropDownMenuProfile.scss";

import { IoSettingsOutline } from "react-icons/io5";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

const DropDownMenuProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie("token");
    removeCookie("zoneRole");
    removeCookie("zoneRoleOn");
    removeCookie("countyId");
    removeCookie("villageId");
    removeCookie("localityId");
    removeCookie("admin");
    navigate("/");
  };
  const handleSelectedAction = (e) => {
    e.preventDefault();
    const action = e.target.closest(".menu-item__profile").id;

    if (action === "log-out") logOut();
  };

  function DropDownItemProfile(props) {
    return (
      <a className="menu-item__profile" id={props.action}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown__profile" onClick={handleSelectedAction}>
      <DropDownItemProfile
        leftIcon={<IoSettingsOutline className="icon-left__profile" />}
        action="settings"
      >
        <span className="menu-item-text__profile">Setări</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<GiLevelThreeAdvanced className="icon-left__profile" />}
        action="rank"
      >
        <span className="menu-item-text__profile">Rank</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<IoMdContact className="icon-left__profile" />}
        action="contact"
      >
        <span className="menu-item-text__profile">Contact</span>
      </DropDownItemProfile>
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
