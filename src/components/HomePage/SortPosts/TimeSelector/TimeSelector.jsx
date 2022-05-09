import { useState } from "react";

import "./TimeSelectorStyles.scss";
import { useNavigate, useLocation } from "react-router-dom";

const TimeSelector = ({
  setSelectedTime,
  setOpenedTimeSelector,
  setActiveOption,
  activeOption,
}) => {
  // const [activeOption, setActiveOption] = useState("ttimp");
  const navigate = useNavigate();
  const search = useLocation();
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
    let params = search.pathname;
    params = params.replace('&time=today','');
    params = params.replace('&time=this_week','');
    params = params.replace('&time=this_month','');
    // params = params.replace('&time=today','');
    const selectedOption = e.target.closest(".time-options__item").id;
    // alert(selectedOption)
    if (selectedOption === "astazi") {
      navigate(params + "&time=today" )
      setSelectedTime("Astazi");
      setActiveOption(selectedOption);
      console.log(activeOption, "fdf");
      setOpenedTimeSelector(false);
    } else if (selectedOption === "luna") {
      navigate(params + "&time=this_month" )
      setSelectedTime("Luna a...");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    } else if (selectedOption === "sapt") {
      navigate(params + "&time=this_week" )
      setSelectedTime("Saptamana...");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
    } else if (selectedOption === "ttimp") {
      navigate(params)
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
      <TimeOptionItem id="astazi">
        <span className="time-options__item__text">Astazi</span>
      </TimeOptionItem>
      <TimeOptionItem id="sapt">
        <span className="time-options__item__text">Saptamana aceasta</span>
      </TimeOptionItem>
      <TimeOptionItem id="luna">
        <span className="time-options__item__text">Luna aceasta</span>
      </TimeOptionItem>
    </div>
  );
};

export default TimeSelector;
