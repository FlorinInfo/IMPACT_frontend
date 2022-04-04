import "./NavigationBarStyles.scss";

import Logo from "./Logo/Logo";
import Home from "./Home/Home";
import SearchBar from "./SearchBar/Searchbar";
import NavBarActions from "./NavBarActions/NavBarActions";
import Profile from "./Profile/Profile";

const NavigationBar = () => {
  return (
    <div className="navbar">
      <Logo />
      <Home />
      <SearchBar />
      <NavBarActions />
      <Profile />
    </div>
  );
};

export default NavigationBar;
