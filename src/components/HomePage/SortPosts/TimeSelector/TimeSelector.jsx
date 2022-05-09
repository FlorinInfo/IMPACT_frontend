import { useState } from "react";

import "./TimeSelectorStyles.scss";

const TimeSelector = ({ setSelectedTime, setOpenedTimeSelector }) => {
  const [activeOption, setActiveOption] = useState("ttimp");
  console.log(activeOption, "fdfd");

  function TimeOptionItem(props) {
    return (
      <>
        {activeOption != props.id && (
          <a className={"time-options__item"} id={props.id}>
            {props.children}
          </a>
        )}
      </>
    );
  }

  const handleSelectedTime = (e) => {
    e.preventDefault();
    const selectedOption = e.target.closest(".time-options__item").id;
    if (selectedOption === "acum") {
      setSelectedTime("Acum");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    } else if (selectedOption === "astazi") {
      setSelectedTime("Astazi");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    } else if (selectedOption === "sapt") {
      setSelectedTime("Saptamana...");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    } else if (selectedOption === "ttimp") {
      setSelectedTime("Tot timpul");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    }
  };

  return (
    <div className="time-options" onClick={handleSelectedTime}>
      <TimeOptionItem id="ttimp">
        <span className="time-options__item__text">Tot timpul</span>
      </TimeOptionItem>
      <TimeOptionItem id="acum">
        <span className="time-options__item__text">Acum</span>
      </TimeOptionItem>
      <TimeOptionItem id="astazi">
        <span className="time-options__item__text">Astazi</span>
      </TimeOptionItem>
      <TimeOptionItem id="sapt">
        <span className="time-options__item__text">Saptamana aceasta</span>
      </TimeOptionItem>
    </div>
  );
};

export default TimeSelector;
