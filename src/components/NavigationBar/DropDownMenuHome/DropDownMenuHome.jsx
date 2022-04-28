import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import "./DropDownMenuHomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { MdHome } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoAddSharp } from "react-icons/io5";

import { ImpactStore } from "../../../store/ImpactStore";

const DropDownMenuHome = () => {
  const { user, setUser } = useContext(ImpactStore);
  console.log(user, "fggdgdf");

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
      {(user.admin || user.zoneRole === "MODERATOR") && (
        <span className="section-name">Administrator</span>
      )}
      {user.admin && (
        <DropDownItemHome
          className="menu-item__home"
          leftIcon={<RiAdminLine className="icon-left__home" />}
          nextPage="/users"
        >
          <span className="menu-item-text__home">Users</span>
        </DropDownItemHome>
      )}
      {(user.admin || user.zoneRole === "MODERATOR") && (
        <DropDownItemHome
          className="menu-item__home"
          leftIcon={<AiOutlineUnorderedList className="icon-left__home" />}
          nextPage="/waiting-list"
        >
          <span className="menu-item-text__home">Waiting-List</span>
        </DropDownItemHome>
      )}
      <span className="section-name">Utilizator</span>
      <DropDownItemHome
        className="menu-item__home"
        leftIcon={<MdHome className="icon-left__home" />}
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
