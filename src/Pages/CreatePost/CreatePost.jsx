import React, { useState, useContext } from "react";

import ImageUploadPreview from "./../../components/ImageUploadPreview/ImageUploadPreview";

import { MdOutlinePostAdd } from "react-icons/md";
import { AsyncPaginate } from "react-select-async-paginate";
import UploadPostMedia from "../../components/UploadPostMedia/UploadPostMedia";
import {MdPermMedia} from "react-icons/md"


import "./CreatePostStyles.scss";

import { ImpactStore } from "../../store/ImpactStore";

const CreatePost = () => {
  const { user, setUser } = useContext(ImpactStore);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zones, setZones] = useState([]);
  const [zone, setZone] = useState(
    {
      value:"COUNTY",
      label:"Judet"
    }
  ); 

  const loadZones = ()=> {
    let options = [];
    if(user.localityId) options = 
      [
        {
          value:"COUNTY",
          label:"Judet"
        },
        {
          value:"VILLAGE",
          label:"Comuna"
        },
        {
          value:"LOCALITY",
          label:"Localitate"
        }
      ]
    else 
    options = 
      [
        {
          value:"COUNTY",
          label:"Judet"
        },
        {
          value:"VILLAGE",
          label:"Oras"
        },
      ]
      return {options};
  }

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
            <div className="create-post__fields">
            <AsyncPaginate
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              loadOptions={loadZones}
              value={zone}
              onChange={setZone}
              classNamePrefix="react-select"
              className="react-select react-select__create-post"
              placeholder={"Selecteaza zona"}
            />
            <input
              className="create-post__editor__title input-default"
              placeholder="Titlu"
            />
            <textarea
              className="create-post__editor__textarea input-default"
              placeholder="Text (opțional)"
            />
            <div className="create-post__editor__upload-images">
              <h3 className="create-post__media-title">
                Adauga media <MdPermMedia className="create-post__media-title-icon"/>
              </h3>
              <UploadPostMedia/>
              {/* <input type="file" className="btn__upload-image" /> */}
              {/* <input type="file" name="file" id="file" class="inputfile" />
              <label className="btn__upload-image" for="file" /> */}
              {/* <ImageUploadPreview /> */}
            </div>
            {/* <div className="create-post__editor__h-line"></div>
            <button className="btn__post-image">Posteaza</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
