import React from "react";
import { useNavigate } from "react-router-dom";

import "./NavBarActionsStyles.scss";

import { IoIosNotificationsOutline } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";
import { ImpactStore } from "../../../store/ImpactStore";
import { useContext } from "react";
import { Link } from "react-router-dom";

const NavBarActions = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(ImpactStore);
  return (
    <div className="actions-container">
      {/* <Notifications className="action" /> */}
      <IoIosNotificationsOutline className="action" />
        <BsHeart className="action" onClick={() => {
          navigate(`/user/${user.id}/favorites`);
        }} />
      <IoAddSharp 
        className="action"
        onClick={() => {
          navigate("/create-post");
        }}
      />
    </div>
  );
};

export default NavBarActions;
