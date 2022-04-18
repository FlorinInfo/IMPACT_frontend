import React from "react";
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
  function DropDownItemHome(props) {
    return (
      <a href={props.href} className="menu-item__home">
        <span>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown__home">
      <span className="section-name">Administrator</span>
      <DropDownItemHome
        leftIcon={<RiAdminLine className="icon-left__home" />}
        href="/create-admins"
      >
        <span className="menu-item-text__home">Create-Admins</span>
      </DropDownItemHome>
      <DropDownItemHome
        leftIcon={<AiOutlineUnorderedList className="icon-left__home" />}
        href="/waiting-list"
      >
        <span className="menu-item-text__home">Waiting-List</span>
      </DropDownItemHome>
      <span className="section-name">Utilizator</span>
      <DropDownItemHome
        leftIcon={<HomeIcon className="icon-left__home" />}
        href="/"
      >
        <span className="menu-item-text__home">Home</span>
      </DropDownItemHome>
      <DropDownItemHome
        leftIcon={<IoAddSharp className="icon-left__home" />}
        href="/create-post"
      >
        <span className="menu-item-text__home">Create-Post</span>
      </DropDownItemHome>
    </div>
  );
}

export default NavigationBar;
