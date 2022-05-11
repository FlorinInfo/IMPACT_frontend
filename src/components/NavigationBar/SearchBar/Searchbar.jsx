import react, { useState } from "react";

import "./SearchBarStyles.scss";

import SearchIcon from "@material-ui/icons/Search";
import SearchBarResults from "../SearchBarResults/SearchBarResults";

const SearchBar = () => {
  const [showSearchBarResults, setShowSearchBarResults] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSearchBarResultsChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setShowSearchBarResults(true);

    // if (searchInput.length > 0) return searchInput;
  };

  return (
    <>
      <div className="searchbar">
        <label htmlFor="searchbar">
          <SearchIcon />
        </label>
        <input
          className="input-default"
          id="searchbar"
          placeholder="Caută"
          onChange={handleSearchBarResultsChange}
          value={searchInput}
        />
        {showSearchBarResults && (
          <SearchBarResults
            setShowSearchBarResults={setShowSearchBarResults}
            value={searchInput}
          />
        )}
      </div>
    </>
  );
};

export default SearchBar;
