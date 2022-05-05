import react from "react";

import "./SortPostsProfileStyles.scss";
import "./../HomePage/SortPosts/SortPostsStyles.scss";

import { AiOutlineSend } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";

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

const SortPostsProfile = () => {
  //   const handleSelectedSort = (e) => {
  //     e.preventDefault();
  //     setSelectedSort(e.target.closest(".sort-button").id);
  //     // if (e.target.closest(".sort-button").id != "time")
  //     // emitSort(e.target.closest(".sort-button").id);
  //   };

  return (
    <div
      className="section__sort-post"
      //   onClick={handleSelectedSort}
      //   ref={timeSelectorRef}
    >
      <SortButton
        id="trimis"
        // active={"trimis" === selectedSort}
        leftIcon={<AiOutlineSend className="sort-button__icon" />}
      >
        <span className="sort-button__text">Trimise</span>
      </SortButton>
      <SortButton
        id="vizionat"
        // active={"vizionat" === selectedSort}
        leftIcon={<AiFillEye className="sort-button__icon" />}
      >
        <span className="sort-button__text">Vazute</span>
      </SortButton>
      <SortButton
        id="completed"
        // active={"completed" === selectedSort}
        leftIcon={<AiOutlineFileDone className="sort-button__icon" />}
      >
        <span className="sort-button__text">Efectuate</span>
      </SortButton>
      <SortButton
        id="inProgress"
        // active={"inProgress" === selectedSort}
        leftIcon={<IoTimeSharp className="sort-button__icon" />}
      >
        <span className="sort-button__text">In lucru</span>
      </SortButton>
      <SortButton
        id="favourite"
        // active={"favourite" === selectedSort}
        leftIcon={<MdFavorite className="sort-button__icon" />}
      >
        <span className="sort-button__text">Favorite</span>
      </SortButton>
    </div>
  );
};

export default SortPostsProfile;
