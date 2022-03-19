import "./SignUpFormStyles.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { createRef } from "react";
import axios from "../../assets/axios/axios";
import { useState } from "react";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import FormData from "form-data";

import logoBlack from "../../assets/images/logo-black.svg"

const SignUpForm = () => {
  const [image, setImage] = useState("");
  const fileInput = createRef();

  const openUpload = () => {
    fileInput.current.click();
  };

  const createImage = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios
      .post("/upload-image", formData, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        },
      })
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <>
      <form action="submit" className="signup-form">
        <img src= {logoBlack} alt="logo" className="signup-form__logo" />
        <h3 className="signup-form__title">Inregistreaza-te pe Impact</h3>
        <div className="signup-form__h-line"></div>
        <div className="signup-form__double">
          <div>
            <label htmlFor="email" className="label-default">
              Nume
            </label>
            <input type="text" className="input-default" name="nume" />
            <span className="error-default"></span>
          </div>
          <div>
            <label htmlFor="prenume" className="label-default">
              Prenume
            </label>
            <input type="text" className="input-default" name="prenume" />
            <span className="error-default"></span>
          </div>
        </div>
        <label htmlFor="email" className="label-default">
          Adresa de email
        </label>
        <input type="text" className="input-default" name="email" />
        <span className="error-default"></span>
        <label htmlFor="email" className="label-default">
          Adresa din buletin
        </label>
        <SearchDropdown />
        <span className="error-default"></span>
        <div className="upload-file-cnt">
          <label htmlFor="buletin" className="label-default">
            Poza actului de identitate
          </label>
          <input
            type="text"
            name="buletin"
            className="input-default file-fake-input"
            placeholder="Incarca poza"
            readOnly
            onClick={openUpload}
          />
          <FaCloudUploadAlt className="file-icon" />
        </div>
        <input
          type="file"
          onChange={createImage}
          ref={fileInput}
          className="file-input"
        />
        <span className="error-default"></span>
        <label htmlFor="parola" className="label-default">
          Parola
        </label>
        <input
          type="password"
          className="input-default"
          name="parola"
          placeholder="6+ caractere"
        />
        <span className="error-default"></span>
        <button type="button" className="button-default-form submit-btn">
          Inregistreaza-te
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
