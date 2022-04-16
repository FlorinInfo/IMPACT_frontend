import React from "react";
import { useNavigate } from "react-router-dom";

import "./NavBarActionsStyles.scss";

import { IoIosNotificationsOutline } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";

const NavBarActions = () => {
  const navigate = useNavigate();

  return (
    <div className="actionsContainer">
      {/* <Notifications className="action" /> */}
      <IoIosNotificationsOutline className="action" />
      <BsHeart className="action" />
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
