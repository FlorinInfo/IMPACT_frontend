import React from "react";

import { MdOutlinePostAdd } from "react-icons/md";

import "./CreatePostStyles.scss";

const CreatePost = () => {
  return (
    <div className="create-post">
      <div className="create-post__container">
        <div className="create-post__left">
          <h2 className="create-post__title">Creeaza postare</h2>
          <div className="create-post__h-line"></div>
          <div className="create-post__editor">
            <h3 className="create-post__editor__header">
              <MdOutlinePostAdd className="create-post__editor__header__icon" />
              Postare
            </h3>
            <input
              className="create-post__editor__title input-default"
              placeholder="Titlu"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
