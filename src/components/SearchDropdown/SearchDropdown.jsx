import "./SearchDropdownStyles.scss";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";


const SearchDropDown = ({ onSelect, onSearch, list, selected }) => {
  return (
    <div className="search-dropdown">
      <input
        type="text"
        className="input-default"
        value={selected}
        onInput={(e)=>onSearch(e.target.value)}
      />
      {list.length ? (
        <ul className="search-dropdown__responses">
          {list.map((l) => (
            <li
              className="search-dropdown__response"
              key={nanoid()}
              onClick={() => onSelect(l.nume)}
            >
              {l.nume} 
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchDropDown;
