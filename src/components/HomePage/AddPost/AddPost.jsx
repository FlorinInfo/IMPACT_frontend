import React from "react";

import "./AddPostStyles.scss";

import ProfilePicture from "./../../../assets/images/default_profile_pic1.jpg";

const AddPost = () => {
  return (
    <div className="main-container section--create-post">
      <img src={ProfilePicture} />
      <input
        className="input-default"
        id="create-post"
        placeholder="Crează o postare"
      />
    </div>
  );
};

export default AddPost;
