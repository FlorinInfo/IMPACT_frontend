import React, { useState } from "react";

import { AiTwotoneFire } from "react-icons/ai";
import { IoMdMedal } from "react-icons/io";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";

import "./SortPostsStyles.scss";

function SortButton(props) {
  const [clicked, setClicked] = useState("");

  const clickedButton = (e) => {
    clicked ? setClicked("") : setClicked("sort-button__label selected");
    // console.log(e);
  };

  return (
    <a
      href={props.ref}
      className={clicked || `sort-button__label ${props.active && "selected"}`}
      onClick={clickedButton}
    >
      <span className="sort-button_icon">{props.leftIcon}</span>
      {props.children}
    </a>
  );
}

const SortPosts = () => {
  return (
    <div className="section__sort-post">
      <SortButton
        active={true}
        leftIcon={<AiTwotoneFire className="sort-button__icon" />}
      >
        <span className="sort-button__text">Populare</span>
      </SortButton>
      <SortButton leftIcon={<IoMdMedal className="sort-button__icon" />}>
        <span className="sort-button__text">Noi</span>
      </SortButton>
      <SortButton
        leftIcon={<AiOutlineFileDone className="sort-button__icon" />}
      >
        <span className="sort-button__text">Efectuate</span>
      </SortButton>
      <SortButton leftIcon={<IoTimeSharp className="sort-button__icon" />}>
        <span className="sort-button__text">In lucru</span>
      </SortButton>
    </div>
  );
};

export default SortPosts;
