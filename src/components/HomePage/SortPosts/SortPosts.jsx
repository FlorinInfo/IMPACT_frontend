import React, { useState } from "react";
import { Router, useParams } from "react-router-dom";

import { AiTwotoneFire } from "react-icons/ai";
import { IoMdMedal,IoIosPodium } from "react-icons/io";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp, } from "react-icons/io5";


import "./SortPostsStyles.scss";

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

const SortPosts = ({emitSort}) => {
  let { routeFilter } = useParams();
  const [selectedSort, setSelectedSort] = useState(routeFilter==undefined ? "recent" : routeFilter.split("-")[2]);

  const handleSelectedSort = (e) => {
    e.preventDefault();
    setSelectedSort(e.target.closest(".sort-button").id);
    emitSort(e.target.closest(".sort-button").id);
  };

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
    </div>
  );
};

export default SortPosts;
