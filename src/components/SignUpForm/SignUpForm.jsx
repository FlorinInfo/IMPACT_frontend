import "./SignUpFormStyles.scss";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BsCloudCheckFill } from "react-icons/bs";
import { createRef } from "react";
import axios from "../../assets/axios/axios";
import { useState, useEffect, useRef } from "react";
import SearchDropdown from "../SearchDropdown/SearchDropdown";
import FormData from "form-data";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { AsyncPaginate } from "react-select-async-paginate";

import logoBlack from "../../assets/images/logo-black.svg";

let judete = [];
let orase = []; // + comune
let localitati = [];
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SignUpForm = () => {
  let navigate = useNavigate();
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  // Errors
  const [imageError, setImageError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [judetError, setJudetError] = useState("");
  const [orasError, setOrasError] = useState("");
  const [localitateError, setLocalitateError] = useState("");

  // Locations
  const [judet, setJudet] = useState({
    name: "",
    id: null,
  });

  const [oras, setOras] = useState({
    name: "",
    id: null,
  });

  const [localitate, setLocalitate] = useState({
    name: "",
    id: "",
  });

  const loadJudete = async () => {
    const response = await axios.get("/counties");
    let options = [];
    if (Array.isArray(response.data)) options = [...response.data];
    return {
      options,
    };
  };

  const loadOrase = async () => {
    const response = await axios.get(`/villages?countyId=${judet.id}`);
    let options = [];
    if (Array.isArray(response.data)) options = [...response.data];
    return {
      options,
    };
  };

  const loadLocalitati = async () => {
    const response = await axios.get(`/localities?villageId=${oras.id}`);
    let options = [];
    if (Array.isArray(response.data)) options = [...response.data];
    return {
      options,
    };
  };

  useEffect(() => {
    setLocalitate({
      name: "",
      id: "",
    });
  }, [oras.id]);

  useEffect(() => {
    setLocalitate({
      name: "",
      id: "",
    });
    setOras({
      name: "",
      id: null,
    });
  }, [judet.id]);

  // Image Upload
  const fileInput = createRef();

  const openUpload = () => {
    fileInput.current.click();
  };

  const createImage = (e) => {
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    axios
      .post("/upload-document", formData, {
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
    axios
      .post(
        "/users",
        {
          password,
          // address: "Iasi",
          lastName,
          firstName,
          photoUrl: image,
          email,
          countyId: judet.id,
          villageId: oras.id,
          ...(localitate.id && { localityId: localitate.id }),
        },
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        // handle success
        setEmailError("");
        setFirstNameError("");
        setLastNameError("");
        setPasswordError("");
        setImageError("");
        setJudetError("");
        setOrasError("");
        setLocalitateError("");
        if (response.data.token) {
          setCookie("token", response.data.token);
          navigate("/");
        } else if (response.data.errors) {
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
          if (response.data.errors.county)
            setJudetError(response.data.errors.county.details);
          if (response.data.errors.village)
            setOrasError(response.data.errors.village.details);
          if (response.data.errors.locality)
            setLocalitateError(response.data.errors.locality.details);
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
        <div className="signup-form__locations">
          <div style={{ width: "30%" }}>
            <label htmlFor="judet" className="label-default">
              Judet
            </label>
            <AsyncPaginate
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              options={judete}
              classNamePrefix="react-select"
              className="react-select"
              value={judet}
              onChange={setJudet}
              loadOptions={loadJudete}
              placeholder={""}
            />
            {/* <SearchDropdown
            onSelect={selectJudet}
            list={judeteFilter}
            selected={judet}
            onSearch={updateJudete}
          /> */}
            <span className="error-default">{judetError}</span>
          </div>
          <div style={{ width: "30%" }}>
            <label htmlFor="oras" className="label-default">
              Oras / Comuna
            </label>
            <AsyncPaginate
              isDisabled={judet.id == null}
              key={judet.id}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              classNamePrefix="react-select"
              className="react-select"
              value={oras}
              onChange={setOras}
              loadOptions={loadOrase}
              placeholder={""}
            />
            {/* <SearchDropdown
              onSelect={selectOras}
              list={oraseFilter}
              selected={oras}
              onSearch={updateOrase}
            /> */}
            <span className="error-default">{orasError}</span>
          </div>
          <div style={{ width: "30%" }}>
            <label htmlFor="localitate" className="label-default">
              Localitate
            </label>
            <AsyncPaginate
              isDisabled={oras.id == null}
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
            {/* <SearchDropdown
              onSelect={selectLocalitate}
              list={localitatiFilter}
              selected={localitate}
              onSearch={updateLocalitati}
            /> */}
            <span className="error-default">{localitateError}</span>
          </div>
        </div>
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
