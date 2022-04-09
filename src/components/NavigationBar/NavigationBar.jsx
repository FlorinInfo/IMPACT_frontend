import "./NavigationBarStyles.scss";

import Logo from "./Logo/Logo";
import Home from "./Home/Home";
import SearchBar from "./SearchBar/Searchbar";
import NavBarActions from "./NavBarActions/NavBarActions";
import Profile from "./Profile/Profile";

import { IoSettingsOutline } from "react-icons/io5";
import { GiLevelThreeAdvanced } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <Logo />
      <Home />
      <SearchBar />
      <NavBarActions />
      <Profile>
        <DropDownMenu />
      </Profile>
    </div>
  );
};

function DropDownMenu() {
  function DropDownItem(props) {
    return (
      <a href="#" className="menu-item">
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown">
      <DropDownItem leftIcon={<IoSettingsOutline className="icon-left" />}>
        <span className="menu-item-text">Setări</span>
      </DropDownItem>
      <DropDownItem leftIcon={<GiLevelThreeAdvanced className="icon-left" />}>
        <span className="menu-item-text">Rank</span>
      </DropDownItem>
      <DropDownItem leftIcon={<IoMdContact className="icon-left" />}>
        <span className="menu-item-text">Contact</span>
      </DropDownItem>
      <DropDownItem leftIcon={<BiLogOut className="icon-left" />}>
        <span className="menu-item-text">Log out</span>
      </DropDownItem>
    </div>
  );
}

export default NavigationBar;
