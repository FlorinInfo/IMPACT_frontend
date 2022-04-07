import "./SignUpFormStyles.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BsCloudCheckFill } from "react-icons/bs";
import { createRef } from "react";
import axios from "../../assets/axios/axios";
import { useState, useEffect } from "react";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import FormData from "form-data";

import logoBlack from "../../assets/images/logo-black.svg";

// let apiLocations = [
//   {
//     nume: "Barcea",
//   },
//   {
//     nume: "Bereşti",
//     simplu: "Beresti",
//   },
//   {
//     nume: "Bereşti-Meria",
//     simplu: "Beresti-Meria",
//   },
//   {
//     nume: "Braniştea",
//     simplu: "Branistea",
//   },
//   {
//     nume: "Brăhăşeşti",
//     simplu: "Brahasesti",
//   },
//   {
//     nume: "Buciumeni",
//   },
//   {
//     nume: "Băleni",
//     simplu: "Baleni",
//   },
//   {
//     nume: "Bălăbăneşti",
//     simplu: "Balabanesti",
//   },
//   {
//     nume: "Bălăşeşti",
//     simplu: "Balasesti",
//   },
//   {
//     nume: "Băneasa",
//     simplu: "Baneasa",
//   },
//   {
//     nume: "Cavadineşti",
//     simplu: "Cavadinesti",
//   },
//   {
//     nume: "Cerţeşti",
//     simplu: "Certesti",
//   },
//   {
//     nume: "Corni",
//   },
// ];
// let judete = [];

let judete = [];

const SignUpForm = () => {
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  // Errors
  const [imageError, setImageError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Locations
  const [judet, setJudet] = useState("");
  // const [judete, setJudete] = useState([]);
  const [judeteFilter, setJudeteFilter] = useState([]);

  const updateJudete = (loc) => {
    // console.log(loc);
    setJudet(loc);
    setJudeteFilter(
      judete.filter((l) => l.name.toLowerCase().includes(loc.toLowerCase()))
    );
    console.log(judete);
  };

  const selectJudet = (value) => {
    // alert(value)
    setJudet(value.name);
    setJudeteFilter([]);
    // console.log(location);
  };

  useEffect(() => {
    axios
      .get("/counties")
      .then((response) => {
        // handle success
        judete = [...response.data];
        console.log(judete);
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  // Image Upload
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
        setImage(response.data.photoUrl);
        console.log(response);
      })
      .catch((error) => {
        // handle error
        setImage("");
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  // Register user
  const registerUser = () => {
    // const userData = {
    //   password: 123456,
    //   address: "Iasi",
    //   lastName: "Florin",
    //   firstName: "Bucataru",
    //   photoUrl: image,
    //   email: "testemail@test.com",
    // };
    axios
      .post(
        "/users",
        {
          password,
          address: "Iasi",
          lastName,
          firstName,
          photoUrl: image,
          email,
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        // handle success
        if (response.data.errors) {
          console.log(response.data.errors);
          if (response.data.errors.email)
            setEmailError(response.data.errors.email.details);
          if (response.data.errors.firstName)
            setFirstNameError(response.data.errors.firstName.details);
          if (response.data.errors.lastName)
            setLastNameError(response.data.errors.lastName.details);
          if (response.data.errors.password)
            setPasswordError(response.data.errors.password.details);
          if (response.data.errors.photo)
            setImageError(response.data.errors.photo.details);
        }
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
        <img src={logoBlack} alt="logo" className="signup-form__logo" />
        <h3 className="signup-form__title">Inregistreaza-te pe Impact</h3>
        <div className="signup-form__h-line"></div>
        <div className="signup-form__double">
          <div>
            <label htmlFor="email" className="label-default">
              Nume
            </label>
            <input
              type="text"
              className="input-default"
              name="nume"
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className="error-default">{lastNameError}</span>
          </div>
          <div>
            <label htmlFor="prenume" className="label-default">
              Prenume
            </label>
            <input
              type="text"
              className="input-default"
              name="prenume"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span className="error-default">{firstNameError}</span>
          </div>
        </div>
        <label htmlFor="email" className="label-default">
          Adresa de email
        </label>
        <input
          type="text"
          className="input-default"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="error-default">{emailError}</span>
        <label htmlFor="email" className="label-default">
          Judet
        </label>
        <SearchDropdown
          onSelect={selectJudet}
          list={judeteFilter}
          selected={judet}
          onSearch={updateJudete}
        />
        {/* <label htmlFor="email" className="label-default">
          Oras / Comuna
        </label>
        <SearchDropdown
          onSelect={selectLocation}
          list={locations}
          selected={location}
          onSearch={updateLocation}
        /> */}
        <span className="error-default"></span>
        <div className="upload-file-cnt">
          <label htmlFor="buletin" className="label-default">
            Poza actului de identitate
          </label>
          <input
            type="text"
            name="buletin"
            className="input-default file-fake-input"
            placeholder={image ? "Poza incarcata" : "Incarca poza"}
            readOnly
            onClick={openUpload}
          />
          {image ? (
            <BsCloudCheckFill
              className="file-icon"
              style={{ color: "#74c4ba" }}
            />
          ) : (
            <FaCloudUploadAlt className="file-icon" />
          )}
        </div>
        <input
          type="file"
          onChange={createImage}
          ref={fileInput}
          className="file-input"
        />
        <span className="error-default">{imageError}</span>
        <label htmlFor="parola" className="label-default">
          Parola
        </label>
        <input
          type="password"
          className="input-default"
          name="parola"
          placeholder="6+ caractere"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error-default">{passwordError}</span>
        <button
          type="button"
          className="button-default-form submit-btn"
          onClick={registerUser}
        >
          Inregistreaza-te
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
