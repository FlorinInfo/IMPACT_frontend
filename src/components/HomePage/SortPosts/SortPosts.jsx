import React, { useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";
import { IoMdMedal } from "react-icons/io";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";

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

const SortPosts = () => {
  const [selectedSort, setSelectedSort] = useState("populare");

  const handleSelectedSort = (e) => {
    e.preventDefault();
    setSelectedSort(e.target.closest(".sort-button").id);
  };

  return (
    <div className="section__sort-post" onClick={handleSelectedSort}>
      <SortButton
        id="populare"
        active={"populare" === selectedSort}
        leftIcon={<AiTwotoneFire className="sort-button__icon" />}
      >
        <span className="sort-button__text">Populare</span>
      </SortButton>
      <SortButton
        id="noi"
        active={"noi" === selectedSort}
        leftIcon={<IoMdMedal className="sort-button__icon" />}
      >
        <span className="sort-button__text">Noi</span>
      </SortButton>
      <SortButton
        id="efectuate"
        active={"efectuate" === selectedSort}
        leftIcon={<AiOutlineFileDone className="sort-button__icon" />}
      >
        <span className="sort-button__text">Efectuate</span>
      </SortButton>
      <SortButton
        id="inLucru"
        active={"inLucru" === selectedSort}
        leftIcon={<IoTimeSharp className="sort-button__icon" />}
      >
        <span className="sort-button__text">In lucru</span>
      </SortButton>
    </div>
  );
};

export default SortPosts;
