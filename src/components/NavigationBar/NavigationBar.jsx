import React, { useState, useContext } from "react";

import "./NavigationBarStyles.scss";

import Logo from "./Logo/Logo";
import Home from "./Home/Home";
import SearchBar from "./SearchBar/Searchbar";
import NavBarActions from "./NavBarActions/NavBarActions";
import Profile from "./Profile/Profile";
import DropDownMenuProfile from "./DropDownMenuProfile/DropDownMenuProfile";
import DropDownMenuHome from "./DropDownMenuHome/DropDownMenuHome";
import UnderNavigationBar from "./UnderNavigationBar/UnderNavigationBar";
import DropDownMobileMenu from "./DropDownMobileMenu/DropDownMobileMenu";
import { ImpactStore } from "../../store/ImpactStore";

import { IoMenuOutline } from "react-icons/io5";

const NavigationBar = (props) => {
  const { user, setUser } = useContext(ImpactStore);
  const [opened, setOpened] = useState("");

  const handleOpenMobileMenu = () => {
    opened ? setOpened("") : setOpened("overlay");
  };

  return (
    <div className="navbar">
      {opened && <DropDownMobileMenu />}
      <div className="main-navbar">
        <Logo />
        <Home currentPage={props.currentPage}>
          <DropDownMenuHome />
        </Home>
        <SearchBar />
        <div>
          <IoMenuOutline
            className="main-navbar__right-menu-button"
            onClick={handleOpenMobileMenu}
          />
          {/* {opened && <DropDownMobileMenu />} */}
        </div>
        <NavBarActions />
        <Profile>
          <DropDownMenuProfile />
        </Profile>
      </div>
      <UnderNavigationBar />
      <div className={opened}></div>
    </div>
  );
};

export default NavigationBar;
