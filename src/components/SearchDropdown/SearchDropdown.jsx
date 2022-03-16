import "./SearchDropdownStyles.scss";
import { useState } from "react";
import { nanoid } from "nanoid";

const locations = ["Iasi", "Bucuresti", "Valea Lupului"];

const SearchDropDown = () => {
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocations] = useState([]);

  const updateSelectedLocations = (event) => {
    setLocation(event.target.value);
    let newLocations = locations.filter((l) => l.toLowerCase().includes(event.target.value.toLowerCase()))
    setSelectedLocations(newLocations);
  };

  return (
    <div className="search-dropdown">
      <input
        type="text"
        className="input-default"
        value={location}
        onInput={updateSelectedLocations}
      />
      {location != "" && selectedLocation.length ? (
        <ul className="search-dropdown__responses">
          {
            selectedLocation.map((l) => (
              <li className="search-dropdown__response" key={nanoid()}>
                {l}
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
