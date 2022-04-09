import "./SearchDropdownStyles.scss";
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import listenForOutsideClick from "../../utils/outside-click";

const SearchDropDown = ({ onSelect, onSearch, list, selected }) => {
  const inputRef = useRef();
  const [listening, setListening] = useState(false);

  listenForOutsideClick(inputRef, () => {
    alert('You clicked outside')
  });

  return (
    <div  className="search-dropdown" >
      <input
        type="text"
        className="input-default"
        value={selected}
        onInput={(e) => onSearch(e.target.value)}
      />
      {list.length ? (
        <ul className="search-dropdown__responses"  >
          {list.map((l) => (
            <li
              className="search-dropdown__response"
              key={nanoid()}
              onClick={() => onSelect(l)}
            >
              {l.name}
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
