import "./SearchBarStyles.scss";

import SearchIcon from "@material-ui/icons/Search";

const SearchBar = () => {
  return (
    <div className="searchbar">
      <label htmlFor="searchbar">
        <SearchIcon />
      </label>
      <input id="searchbar" placeholder="Caută" />
    </div>
  );
};

export default SearchBar;
