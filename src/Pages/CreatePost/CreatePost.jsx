import React, { useState, useContext } from "react";

import ImageUploadPreview from "./../../components/ImageUploadPreview/ImageUploadPreview";
import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { AsyncPaginate } from "react-select-async-paginate";
import UploadPostMedia from "../../components/UploadPostMedia/UploadPostMedia";
import { MdPermMedia } from "react-icons/md"
import { Cookies, useCookies } from "react-cookie";
import axios from "../../assets/axios/axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import "./CreatePostStyles.scss";

import { ImpactStore } from "../../store/ImpactStore";

const ZoneSelect = ({error, updateZone}) => {
  const { user, setUser } = useContext(ImpactStore);
  const [zone, setZone] = useState("");
  const [zoneId, setZoneId] = useState("");

  const changeZone = (e) => {
    let id = null;
    setZone(e.target.value);
    if (e.target.value == "COUNTY") id = user.countyId;
    if (e.target.value == "VILLAGE") id = user.villageId;
    if (e.target.value == "LOCALITY") id = user.localityId;
    setZoneId(id);
    updateZone({
      type:e.target.value,
      id
    })
  }

  if (user.admin == true) return <></>
  if (user.zoneRole == "CETATEAN") {
    if (user.zoneRoleOn == "VILLAGE") return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label zone-select__title">Selecteaza zona</FormLabel>
        <RadioGroup
          value={zone}
          onChange={changeZone}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="COUNTY" control={<Radio />} label="Judet" />
          <FormControlLabel value="VILLAGE" control={<Radio />} label="Oras" />
        </RadioGroup>
        <span className="error-default">{error}</span>
      </FormControl>
    )
    if (user.zoneRoleOn == "LOCALITY") return (
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label zone-select__title">Selecteaza zona</FormLabel>
        <RadioGroup
          value={zone}
          onChange={changeZone}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="COUNTY" control={<Radio />} label="Judet" />
          <FormControlLabel value="VILLAGE" control={<Radio />} label="Oras" />
          <FormControlLabel value="LOCALITY" control={<Radio />} label="Localitate" />
        </RadioGroup>
        <span className="error-default">{error}</span>
      </FormControl>
    )
  }
}

const CreatePost = () => {
  let navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { user, setUser } = useContext(ImpactStore);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zones, setZones] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [zone, setZone] = useState({
    type:null,
    id:null
  })

  // Errors 
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorZone, setErrorZone] = useState("");

  const updateZone = (z)=> {
    console.log(z);
    setZone(z);
  }

  // const [zone, setZone] = useState(
  //   {
  //     value: "COUNTY",
  //     label: "Judet"
  //   }
  // );

  // const loadZones = () => {
  //   let options = [];
  //   if (user.localityId) options =
  //     [
  //       {
  //         value: "COUNTY",
  //         label: "Judet"
  //       },
  //       {
  //         value: "VILLAGE",
  //         label: "Comuna"
  //       },
  //       {
  //         value: "LOCALITY",
  //         label: "Localitate"
  //       }
  //     ]
  //   else
  //     options =
  //       [
  //         {
  //           value: "COUNTY",
  //           label: "Judet"
  //         },
  //         {
  //           value: "VILLAGE",
  //           label: "Oras"
  //         },
  //       ]
  //   return { options };
  // }

  const getImages = (i) => {
    setImages(i);
  }

  const getVideos = (v) => {
    setVideos(v);
  }

  const addPost = () => {
    console.log(zone);
    console.log({
      title,
      description,
      articleGallery: [
        ...images,
        ...videos
      ],
      ...(zone.type && { zone: zone.type }),
      ...(zone.id && { zoneId: zone.id }),
    })
    axios
      .post("/articles", {
        title,
        description,
        articleGallery: [
          ...images,
          ...videos
        ],
        ...(zone.type && { zone: zone.type }),
        ...(zone.id && { zoneId: zone.id }),
      }, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        console.log(response)
        if (response.data.errors) {
          if (response.data.errors.description) setErrorDescription(response.data.errors.description.details);else setErrorDescription("");
          if (response.data.errors.title) setErrorTitle(response.data.errors.title.details);else setErrorTitle("");
          if (response.data.errors.zone) setErrorZone(response.data.errors.zone.details);else setErrorZone("");
        }
        else {
          navigate("/post/" + response.data.id)
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
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
              <ZoneSelect updateZone={updateZone} error={errorZone}/>
              {/* <AsyncPaginate
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                loadOptions={loadZones}
                value={zone}
                onChange={setZone}
                classNamePrefix="react-select"
                className="react-select react-select__create-post"
                placeholder={"Selecteaza zona"}
              /> */}
              <input
                className="create-post__editor__title input-default"
                placeholder="Titlu"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="error-default">{errorTitle}</span>
              <textarea
                className="create-post__editor__textarea input-default"
                placeholder="Text (opțional)"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="error-default">{errorDescription}</span>
              <div className="create-post__editor__upload-images">
                <h3 className="create-post__media-title">
                  Adauga media <MdPermMedia className="create-post__media-title-icon" />
                </h3>
                <UploadPostMedia getImages={getImages} getVideos={getVideos} />
                {/* <input type="file" className="btn__upload-image" /> */}
                {/* <input type="file" name="file" id="file" class="inputfile" />
              <label className="btn__upload-image" for="file" /> */}
                {/* <ImageUploadPreview /> */}
              </div>
              {/* <div className="create-post__editor__h-line"></div>
            <button className="btn__post-image">Posteaza</button> */}
              <button className="create-post__add-btn button-default-form" onClick={addPost}>Posteaza</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
