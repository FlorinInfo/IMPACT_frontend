import React from "react";
import { useNavigate } from "react-router-dom";

import "./AddPostStyles.scss";

import ProfilePicture from "./../../../assets/images/default_profile_pic1.jpg";

import { useState, useContext } from "react";
import { ImpactStore } from "../../../store/ImpactStore";
import rankPerform from "../../../utils/rank";

const AddPost = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(ImpactStore);
  const [rank, setRank] = useState(
    user.monthlyPoints ?()=>rankPerform(user.monthlyPoints, user.zoneRole, user.admin) : {
      type:"Cetatean",
      color:"black",
      image:"default.jpg"
    }
  );

  return (
    <div className="main-container section--create-post">
      <img src={require(`../../../assets/images/ranks/${rank.image}`)} />
      <input
        className="input-default"
        id="create-post"
        placeholder="Creează o postare"
        onClick={() => {
          navigate("/create-post");
        }}
      />
    </div>
  );
};

export default AddPost;
