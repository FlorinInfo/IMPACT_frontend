import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./NavigationBarStyles.scss";

import Logo from "./Logo/Logo";
import Home from "./Home/Home";
import SearchBar from "./SearchBar/Searchbar";
import NavBarActions from "./NavBarActions/NavBarActions";
import Profile from "./Profile/Profile";

import HomeIcon from "@material-ui/icons/Home";
import { GrUserAdmin } from "react-icons/gr";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

const NavigationBar = (props) => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <Logo />
      <Home currentPage={props.currentPage}>
        <DropDownMenuHome />
      </Home>
      <SearchBar />
      <NavBarActions />
      <Profile>
        <DropDownMenuProfile />
      </Profile>
    </div>
  );
};

function DropDownMenuProfile() {
  function DropDownItemProfile(props) {
    return (
      <a href="#" className="menu-item__profile">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown__profile">
      <DropDownItemProfile
        leftIcon={<IoSettingsOutline className="icon-left__profile" />}
      >
        <span className="menu-item-text__profile">Setări</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<GiLevelThreeAdvanced className="icon-left__profile" />}
      >
        <span className="menu-item-text__profile">Rank</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<IoMdContact className="icon-left__profile" />}
      >
        <span className="menu-item-text__profile">Contact</span>
      </DropDownItemProfile>
      <DropDownItemProfile
        leftIcon={<BiLogOut className="icon-left__profile" />}
      >
        <span className="menu-item-text__profile">Log out</span>
      </DropDownItemProfile>
    </div>
  );
}

function DropDownMenuHome() {
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("");

  const handleSelectedPage = (e) => {
    e.preventDefault();
    navigate(e.target.closest(".menu-item__home").id);
  };

  function DropDownItemHome(props) {
    return (
      <a className="menu-item__home" id={props.nextPage}>
        <span>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown__home" onClick={handleSelectedPage}>
      <span className="section-name">Administrator</span>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<RiAdminLine className="icon-left__home" />}
        nextPage="/create-admins"
      >
        <span className="menu-item-text__home">Create-Admins</span>
      </DropDownItemHome>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<AiOutlineUnorderedList className="icon-left__home" />}
        nextPage="/waiting-list"
      >
        <span className="menu-item-text__home">Waiting-List</span>
      </DropDownItemHome>
      <span className="section-name">Utilizator</span>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<HomeIcon className="icon-left__home" />}
        nextPage="/"
      >
        <span className="menu-item-text__home">Home</span>
      </DropDownItemHome>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<IoAddSharp className="icon-left__home" />}
        nextPage="/create-post"
      >
        <span className="menu-item-text__home">Create-Post</span>
      </DropDownItemHome>
    </div>
  );
}

export default NavigationBar;
