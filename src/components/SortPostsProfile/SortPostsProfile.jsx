import react, { useState } from "react";

import "./SortPostsProfileStyles.scss";
import "./../HomePage/SortPosts/SortPostsStyles.scss";

import { AiOutlineSend } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { IoTimeSharp } from "react-icons/io5";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { RiFileUserLine } from "react-icons/ri";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useLocation,useParams } from "react-router-dom";



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

const SortPostsProfile = ({activeFilter}) => {
  let navigate = useNavigate();
  let { id } = useParams(); 
  const location = useLocation();
  // const { from } = location.state;
    const handleSelectedSort = (e) => {
      e.preventDefault();
      // setSelectedSort(e.target.closest(".sort-button").id);
      
      navigate(`/user/${id}/${e.target.closest(".sort-button").id}`)
      // if (e.target.closest(".sort-button").id != "time")
      // emitSort(e.target.closest(".sort-button").id);
    };

  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const [activeIndex, setActiveIndex] = useState(0);
  let maxIndex = 2;

  if (vw < 643 && vw >= 454) maxIndex = 3;
  else if (vw < 454) maxIndex = 4;
  console.log(vw, maxIndex);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= maxIndex) newIndex = 1;

    setActiveIndex(newIndex);
  };

  return (
    <div
      className="section__sort-post"
        onClick={handleSelectedSort}
      //   ref={timeSelectorRef}
    >
      {activeIndex != 0 && (
        <MdKeyboardArrowLeft
          className="sort-button__arrow"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        />
      )}
      <div className="carousel">
        <div
          className="inner"
          style={{ transform: `translateX(-${activeIndex * 25}%)` }}
        >
          <SortButton
            id="myPosts"
            active={!activeFilter || activeFilter == "myPosts"}
            leftIcon={<RiFileUserLine className="sort-button__icon" />}
          >
            <span className="sort-button__text">Postarile mele </span>
          </SortButton>
          <SortButton
            id="sent"
            active={"sent" === activeFilter}
            leftIcon={<AiOutlineSend className="sort-button__icon" />}
          >
            <span className="sort-button__text">Trimise</span>
          </SortButton>
          <SortButton
            id="seen"
            active={"seen" === activeFilter}
            leftIcon={<AiFillEye className="sort-button__icon" />}
          >
            <span className="sort-button__text">Vazute</span>
          </SortButton>
          <SortButton
            id="completed"
            active={"completed" === activeFilter}
            leftIcon={<AiOutlineFileDone className="sort-button__icon" />}
          >
            <span className="sort-button__text">Efectuate</span>
          </SortButton>
          <SortButton
            id="inProgress"
            active={"inProgress" === activeFilter}
            leftIcon={<IoTimeSharp className="sort-button__icon" />}
          >
            <span className="sort-button__text">In lucru</span>
          </SortButton>
          <SortButton
            id="favorites"
            active={"favorites" === activeFilter}
            leftIcon={<MdFavorite className="sort-button__icon" />}
          >
            <span className="sort-button__text">Favorite</span>
          </SortButton>
        </div>
      </div>
      {activeIndex != maxIndex - 1 && (
        <MdKeyboardArrowRight
          className="sort-button__arrow"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        />
      )}
    </div>
  );
};

export default SortPostsProfile;
