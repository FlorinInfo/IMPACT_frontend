import React, { useState, useContext, useEffect } from "react";

import ImageUploadPreview from "./../../components/ImageUploadPreview/ImageUploadPreview";
import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { AsyncPaginate } from "react-select-async-paginate";
import UploadPostMedia from "../../components/UploadPostMedia/UploadPostMedia";
import { MdPermMedia } from "react-icons/md"
import axios from "../../assets/axios/axios";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import "./CreatePostStyles.scss";

import { ImpactStore } from "../../store/ImpactStore";

const ZoneSelect = ({ error, updateZone }) => {
  const { user, setUser } = useContext(ImpactStore);
  const [zone, setZone] = useState("");
  const [zoneId, setZoneId] = useState("");

  const changeZone = (e) => {
    setLocalitate({
      name: user.Locality ? user.Locality.name : null,
      id: user.localityId ? user.localityId : null ,
    });
    let id = null;
    setZone(e.target.value);
    if (e.target.value == "COUNTY") id = user.countyId;
    if (e.target.value == "VILLAGE") id = user.villageId;
    if (e.target.value == "LOCALITY") id = localitate.id;

    setZoneId(id);
  }

  const [orase, setOrase] = useState([]);
  const [oras, setOras] = useState({
    name: user.Village.name,
    id: user.villageId,
  });

  const loadOrase = async (search) => {
    const response = await axios.get(`/villages?countyId=${user.countyId}`);
    let options = [];
    if (Array.isArray(response.data)) {
      options = response.data.filter((l) =>
        l.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    setOrase(options);
    return {
      options,
    };
  };

  useEffect(() => {
    if(user.zoneRoleOn == "COUNTY") {
      setLocalitate({
        name: "",
        id: "",
      });
      loadLocalitati("");
  }
  }, [oras.id]);


  const [localitati, setLocalitati] = useState([]);
  const [localitate, setLocalitate] = useState({
    name: user.Locality ? user.Locality.name : null,
    id: user.localityId ? user.localityId : null ,
  });

  const loadLocalitati = async (search) => {
    const response = await axios.get(`/localities?villageId=${oras.id}`);
    let options = [];
    if (Array.isArray(response.data)) {
      options = response.data.filter((l) =>
        l.name.toLowerCase().startsWith(search.toLowerCase())
      );
    }
    setLocalitati(options);
    return {
      options,
    };
  };

  useEffect(()=> {
    if(zone=="VILLAGE") setZoneId(oras.id);
    if(zone =="LOCALITY") setZoneId(localitate.id);
    updateZone({
      type: zone,
      id: zoneId
    })
  }, [oras.id, localitate.id, zone, zoneId])

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
  if (user.zoneRole == "ADMINISTRATOR" || user.zoneRole == "MODERATOR") {
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
          {user.localityId ? <FormControlLabel value="LOCALITY" control={<Radio />} label="Localitate" /> : ""}
        </RadioGroup>
        <span className="error-default">{error}</span>
        {
          user.localityId && zone == "LOCALITY" ?
            <AsyncPaginate
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              classNamePrefix="react-select"
              className="react-select"
              value={localitate}
              onChange={setLocalitate}
              loadOptions={loadLocalitati}
              placeholder={""}
            />
            : ""
        }
      </FormControl>
    )
    if (user.zoneRoleOn == "COUNTY") return (
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
        {
          zone == "LOCALITY" ?
            <>
              <AsyncPaginate
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={oras}
                onChange={setOras}
                loadOptions={loadOrase}
                placeholder={""}
              />
              <AsyncPaginate
              key={oras.id}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                classNamePrefix="react-select"
                className="react-select"
                value={localitate}
                onChange={setLocalitate}
                loadOptions={loadLocalitati}
                placeholder={""}
              />
            </>
            : ""
        }
        {zone == "VILLAGE" ?
          <AsyncPaginate
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            classNamePrefix="react-select"
            className="react-select"
            value={oras}
            onChange={setOras}
            loadOptions={loadOrase}
            placeholder={""}
          />
          : ""
        }
      </FormControl>
    )
  }
}

const CreatePost = () => {
  let navigate = useNavigate();
  const { user, setUser } = useContext(ImpactStore);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zones, setZones] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [zone, setZone] = useState({
    type: null,
    id: null
  })

  // Errors 
  const [errorTitle, setErrorTitle] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorZone, setErrorZone] = useState("");

  const updateZone = (z) => {
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
    axios
      .post("/articles", {
        title,
        description,
        articleGallery: [
          ...images,
          ...videos
        ],
        ...(zone.type&&zone.id  && { zone: zone.type }),
        ...(zone.id&&zone.type && { zoneId: zone.id }),
      }, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // handle success
        if (response.data.errors) {
          if (response.data.errors.description) setErrorDescription(response.data.errors.description.details); else setErrorDescription("");
          if (response.data.errors.title) setErrorTitle(response.data.errors.title.details); else setErrorTitle("");
          if (response.data.errors.zone) setErrorZone(response.data.errors.zone.details); else setErrorZone("");
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
              <ZoneSelect updateZone={updateZone} error={errorZone} />
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
                value={title}
                className="create-post__editor__title input-default"
                placeholder="Titlu"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span className="error-default">{errorTitle}</span>
              <textarea
                className="create-post__editor__textarea input-default"
                placeholder="Descriere"
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
