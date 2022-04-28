import React, { useState, useEffect, useRef } from "react";
import { Router, useParams } from "react-router-dom";

import { AiTwotoneFire } from "react-icons/ai";
import { IoMdMedal, IoIosPodium } from "react-icons/io";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import "./SortPostsStyles.scss";

import TimeSelector from "./TimeSelector/TimeSelector";

function SortButton(props) {
  return (
    <button className="sort-button" id={props.id}>
      <a
        className={
          props.active ? "sort-button__label selected" : "sort-button__label"
        }
      >
        <span className="sort-button_icon">{props.leftIcon}</span>
        {props.children}
      </a>
    </button>
  );
}

const SortPosts = ({ emitSort }) => {
  let { routeFilter } = useParams();
  const [selectedSort, setSelectedSort] = useState(
    routeFilter == undefined ? "recent" : routeFilter.split("-")[2]
  );

  const [openedTimeSelector, setOpenedTimeSelector] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Astazi");

  const handleSelectedSort = (e) => {
    e.preventDefault();
    setSelectedSort(e.target.closest(".sort-button").id);
    // if (e.target.closest(".sort-button").id != "time")
    emitSort(e.target.closest(".sort-button").id);
  };

  const handleTimeSelector = () => {
    openedTimeSelector
      ? setOpenedTimeSelector(false)
      : setOpenedTimeSelector(true);
  };

  let timeSelectorRef = useRef();

  // useEffect(() => {
  //   let handlerClickOutside = (e) => {
  //     if (!timeSelectorRef.current.contains(e.target)) {
  //       setOpenedTimeSelector(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handlerClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handlerClickOutside);
  //   };
  // });

  const timeSort = selectedSort === "best";

  return (
    <div className="section__sort-post" onClick={handleSelectedSort}>
      <SortButton
        id="recent"
        active={"recent" === selectedSort}
        leftIcon={<IoMdMedal className="sort-button__icon" />}
      >
        <span className="sort-button__text">Noi</span>
      </SortButton>
      <SortButton
        id="best"
        active={"best" === selectedSort}
        leftIcon={<IoIosPodium className="sort-button__icon" />}
      >
        <span className="sort-button__text">Top</span>
      </SortButton>
      <SortButton
        id="completed"
        active={"completed" === selectedSort}
        leftIcon={<AiOutlineFileDone className="sort-button__icon" />}
      >
        <span className="sort-button__text">Efectuate</span>
      </SortButton>
      <SortButton
        id="inProgress"
        active={"inProgress" === selectedSort}
        leftIcon={<IoTimeSharp className="sort-button__icon" />}
      >
        <span className="sort-button__text">In lucru</span>
      </SortButton>
      {timeSort && (
        <button
          className="time-button"
          id="time"
          onClick={handleTimeSelector}
          ref={timeSelectorRef}
        >
          <a className="sort-button__label selected">
            <span className="sort-button__text">{selectedTime}</span>
            <RiArrowDropDownLine className="sort-button__icon" />
          </a>
        </button>
      )}
      {openedTimeSelector && (
        <TimeSelector
          setSelectedTime={setSelectedTime}
          setOpenedTimeSelector={setOpenedTimeSelector}
        />
      )}
    </div>
  );
};

export default SortPosts;
