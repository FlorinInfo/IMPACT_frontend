import { useState } from "react";

import "./TimeSelectorStyles.scss";
import { useNavigate, useLocation } from "react-router-dom";

const TimeSelector = ({
  active,
  // selectedTime,
  // setSelectedTime,
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
    params = params.replace("&time=today", "");
    params = params.replace("&time=this_week", "");
    params = params.replace("&time=this_month", "");
    // params = params.replace('&time=today','');
    const selectedOption = e.target.closest(".time-options__item").id;
    // alert(selectedOption)
    if (selectedOption === "astazi") {
      // setSelectedTime("Astazi");
      setActiveOption(selectedOption);
      console.log(activeOption, "fdf");
      setOpenedTimeSelector(false);
      navigate(params + "&time=today");
    } else if (selectedOption === "luna") {
      // setSelectedTime("Luna a...");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
      navigate(params + "&time=this_month");
    } else if (selectedOption === "sapt") {
      // setSelectedTime("Saptamana...");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
      navigate(params + "&time=this_week");
    } else if (selectedOption === "ttimp") {
      // setSelectedTime("Tot timpul");
      setActiveOption(selectedOption);
      setOpenedTimeSelector(false);
      navigate(params);
    }
  };

  //update time selector UI

  // let path = window.location.pathname;
  // let currentSelection = path.substring(path.indexOf("time=") + 5, path.length);

  // console.log(currentSelection);

  // if (currentSelection === "today") {
  //   // console.log("astazi");
  //   setSelectedTime("Astazi");
  //   // setActiveOption(selectedOption);
  // }

  return (
    <div
      className={active ? "time-options" : "time-options hidden"}
      onClick={handleSelectedTime}
    >
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
