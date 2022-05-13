import "./UploadPostMediaStyles.scss";
import { IoAdd } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import image from "../../assets/images/default_profile_pic1.jpg";
import { createRef, useState } from "react";
import axios from "../../assets/axios/axios";
import { nanoid } from "nanoid";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const override = css`
  display: block;
  margin: auto;
`;

const UploadPostMedia = ({ getImages, getVideos }) => {
  const isImage = (file) => {
    return file && file["type"].split("/")[0] === "image";
  };

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#3b5998");
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const fileInput = createRef();
  const openUploadMedia = () => {
    if (!loading) fileInput.current.click();
  };

  const uploadFile = (e) => {
    setLoading(true);
    if (isImage(e.target.files[0])) {
      let formData = new FormData();
      formData.append("image", e.target.files[0]);
      axios
        .post("/upload-image-article", formData, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((response) => {
          // handle success
          setImages([
            ...images,
            {
              type: "image",
              url: response.data.url,
            },
          ]);
          getImages([
            ...images,
            {
              type: "image",
              url: response.data.url,
            },
          ]);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    } else {
      // alert(1)
      let formData = new FormData();
      formData.append("video", e.target.files[0]);
      axios
        .post("/upload-video-article", formData, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((response) => {
          // handle success
          setVideos([
            ...videos,
            {
              type: "video",
              url: response.data.url,
            },
          ]);
          getVideos([
            ...videos,
            {
              type: "video",
              url: response.data.url,
            },
          ]);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((image, i) => i != index));
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((image, i) => i != index));
  };

  return (
    <div className="media-post">
      <input
        className="media-post__input-upload"
        onChange={uploadFile}
        accept="video/*, image/*"
        type="file"
        ref={fileInput}
      />
      <div className="media-post__grid">
        {images.length
          ? images.map((i, index) => (
              <div
                className="media-post__preview"
                key={i.url}
                style={{ backgroundImage: `url(${i.url})` }}
              >
                <div
                  className="media-post__preview-remove"
                  onClick={() => removeImage(index)}
                >
                  <IoIosClose className="media-post__preview-remove-icon" />
                </div>
              </div>
            ))
          : ""}
        <div className="media-post__add-btn" onClick={openUploadMedia}>
          {loading == false ? (
            <IoAdd className="media-post__add-icon" />
          ) : (
            <HashLoader
              className="media-post__loader"
              color={color}
              loading={loading}
              css={override}
              size={60}
            />
          )}
        </div>
      </div>
      <div className="media-post__videos">
        {videos.map((v, index) => (
          <div className="media-post__video-cnt" key={v.url}>
            <video
              width="320"
              height="240"
              controls
              className="media-post__video"
            >
              <source src={v.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="media-post__video-remove">
              <Button
			  onClick={()=>removeVideo(index)}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
              >
                Sterge
              </Button>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPostMedia;
