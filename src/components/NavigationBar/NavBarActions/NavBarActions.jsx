import React from "react";
import { useNavigate } from "react-router-dom";

import "./NavBarActionsStyles.scss";

import { IoIosNotificationsOutline } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5";
import { ImpactStore } from "../../../store/ImpactStore";
import { useContext } from "react";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import userImg from "../../../assets/images/user.png";

const NavBarActions = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ImpactStore);
  return (
    <div className="actions-container">
      {/* <Notifications className="action" /> */}
      <img
        src={userImg}
        alt=""
        className="action actions__img"
        onClick={() => {
          navigate(`/user/${user.id}`);
        }}
      />
      {/* <FiUser className="action" /> */}
      <BsHeart
        className="action actions__heart"
        onClick={() => {
          navigate(`/user/${user.id}/favorites`);
        }}
      />
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
