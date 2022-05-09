import React from "react";

import "./TopUsersStyles.scss";

import { BiRadioCircle } from "react-icons/bi";

import imgProfile from "./../../../assets/images/default_profile_pic1.jpg";
import rankPerform from "../../../utils/rank";

const TopUsers = ({ users }) => {
  return (
    <>
      {users.length ? (
        <div className="top-users">
          {/* <img className="img__top" src={imgTop} /> */}
          <div className="top-users__title">
            <span className="top-users__title__text">Top utilizatori</span>
          </div>
          {users.map((user, index) => {
            return (
              <div className="top-users__section" key={user.id}>
                <span className="top-users__section__number">{index + 1}</span>
                {/* <BiRadioCircle className="top-users__section__mark" /> */}
                <img
                  className="top-users__section__profile-image"
                  src={require(`../../../assets/images/ranks/${
                    rankPerform(user.monthlyPoints, user.zoneRole, user.admin)
                      .image
                  }`)}
                />
                <span className="top-users__section__username">
                  {user.firstName[0]}. {user.lastName}
                </span>
                <button className="top-users__section__button">
                  {user.monthlyPoints} pct.
                </button>
              </div>
            );
          })}
        </div>
      ) : (
       <> {users.length}</>
      )}
    </>
  );
};

export default TopUsers;
