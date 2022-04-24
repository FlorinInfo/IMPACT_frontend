import React from "react";
import { useNavigate } from "react-router-dom";

import "./DropDownMenuHomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";

const DropDownMenuHome = () => {
  const navigate = useNavigate();

  const handleSelectedPage = (e) => {
    e.preventDefault();
    navigate(e.target.closest(".menu-item__home").id);
  };

  function DropDownItemHome(props) {
    return (
      <a className="menu-item__home" id={props.nextPage}>
        <span>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="dropdown__home" onClick={handleSelectedPage}>
      <span className="section-name">Administrator</span>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<RiAdminLine className="icon-left__home" />}
        nextPage="/create-admins"
      >
        <span className="menu-item-text__home">Create-Admins</span>
      </DropDownItemHome>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<AiOutlineUnorderedList className="icon-left__home" />}
        nextPage="/waiting-list"
      >
        <span className="menu-item-text__home">Waiting-List</span>
      </DropDownItemHome>
      <span className="section-name">Utilizator</span>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<HomeIcon className="icon-left__home" />}
        nextPage="/"
      >
        <span className="menu-item-text__home">Home</span>
      </DropDownItemHome>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<IoAddSharp className="icon-left__home" />}
        nextPage="/create-post"
      >
        <span className="menu-item-text__home">Create-Post</span>
      </DropDownItemHome>
    </div>
  );
};

export default DropDownMenuHome;
