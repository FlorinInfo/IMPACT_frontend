import React from "react";
import { useNavigate } from "react-router-dom";

import "./AddPostStyles.scss";

import ProfilePicture from "./../../../assets/images/default_profile_pic1.jpg";

const AddPost = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container section--create-post">
      <img src={ProfilePicture} />
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
