import "./TimeSelectorStyles.scss";

const TimeSelector = ({ setSelectedTime, setOpenedTimeSelector }) => {
  function TimeOptionItem(props) {
    return (
      <a className="time-options__item" id={props.id}>
        {props.children}
      </a>
    );
  }

  const handleSelectedTime = (e) => {
    e.preventDefault();
    const selectedOption = e.target.closest(".time-options__item").id;
    if (selectedOption === "acum") {
      setSelectedTime("Acum");
      setOpenedTimeSelector(false);
    } else if (selectedOption === "astazi") {
      setSelectedTime("Astazi");
      setOpenedTimeSelector(false);
    } else if (selectedOption === "sapt") {
      setSelectedTime("Saptamana...");
      setOpenedTimeSelector(false);
    }
  };

  return (
    <div className="time-options" onClick={handleSelectedTime}>
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
