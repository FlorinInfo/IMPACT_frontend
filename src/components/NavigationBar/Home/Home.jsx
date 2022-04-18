import React, { useState } from "react";

import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiArrowDropDownLine } from "react-icons/ri";

const userType = "administrator";

const Home = (props) => {
  const [clicked, setClicked] = useState("");

  const handleClick = () => {
    clicked ? setClicked("") : setClicked("homeButton active");
  };

  return (
    <div className="homeButton-container" onClick={handleClick}>
      <button className={clicked || "homeButton"}>
        <HomeIcon className="homeIcon" />
        <h1 className="homeicon--text">Home</h1>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="arrow" />
        {clicked && props.children}
      </button>
    </div>
  );
};

export default Home;
