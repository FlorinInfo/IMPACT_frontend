import React, { useState } from "react";

import ImageUploadPreview from "./../../components/ImageUploadPreview/ImageUploadPreview";

import { MdOutlinePostAdd } from "react-icons/md";

import "./CreatePostStyles.scss";

const CreatePost = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
            <textarea
              className="create-post__editor__textarea input-default"
              placeholder="Text (opțional)"
            />
            <div className="create-post__editor__upload-images">
              {/* <input type="file" className="btn__upload-image" /> */}
              {/* <input type="file" name="file" id="file" class="inputfile" />
              <label className="btn__upload-image" for="file" /> */}
              <ImageUploadPreview />
            </div>
            <div className="create-post__editor__h-line"></div>
            <button className="btn__post-image">Posteaza</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
