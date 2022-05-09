import "./SearchBarStyles.scss";

import SearchIcon from "@material-ui/icons/Search";
import SearchBarResults from "../SearchBarResults/SearchBarResults";

const SearchBar = () => {
  return (
    <>
      <div className="searchbar">
        <label htmlFor="searchbar">
          <SearchIcon />
        </label>
        <input className="input-default" id="searchbar" placeholder="Caută" />
        <SearchBarResults />
      </div>
    </>
  );
};

export default SearchBar;
