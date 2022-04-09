import React from "react";

import "./TopUsersStyles.scss";

import { BiRadioCircle } from "react-icons/bi";

import imgProfile from "./../../../assets/images/default_profile_pic1.jpg";

const TopUsers = () => {
  return (
    <div className="top-users">
      {/* <img className="img__top" src={imgTop} /> */}
      <div className="top-users__title">
        <span className="top-users__title__text">Top utilizatori</span>
      </div>
      <div className="top-users__section">
        <span className="top-users__section__number">1</span>
        <BiRadioCircle className="top-users__section__mark" />
        <img className="top-users__section__profile-image" src={imgProfile} />
        <span className="top-users__section__username">username</span>
        <button className="top-users__section__button">Vezi profilul</button>
      </div>
      <div className="top-users__section">
        <span className="top-users__section__number">2</span>
        <BiRadioCircle className="top-users__section__mark" />
        <img className="top-users__section__profile-image" src={imgProfile} />
        <span className="top-users__section__username">username</span>
        <button className="top-users__section__button">Vezi profilul</button>
      </div>
      <div className="top-users__section">
        <span className="top-users__section__number">3</span>
        <BiRadioCircle className="top-users__section__mark" />
        <img className="top-users__section__profile-image" src={imgProfile} />
        <span className="top-users__section__username">username</span>
        <button className="top-users__section__button">Vezi profilul</button>
      </div>
      <div className="top-users__section">
        <span className="top-users__section__number">4</span>
        <BiRadioCircle className="top-users__section__mark" />
        <img className="top-users__section__profile-image" src={imgProfile} />
        <span className="top-users__section__username">username</span>
        <button className="top-users__section__button">Vezi profilul</button>
      </div>
      <div className="top-users__section">
        <span className="top-users__section__number">5</span>
        <BiRadioCircle className="top-users__section__mark" />
        <img className="top-users__section__profile-image" src={imgProfile} />
        <span className="top-users__section__username">username</span>
        <button className="top-users__section__button">Vezi profilul</button>
      </div>
    </div>
  );
};

export default TopUsers;
