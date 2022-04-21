import "./LoginFormStyles.scss";

import { useState, useContext } from "react";
import axios from "../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlack from "../../assets/images/logo-black.svg";
import setCookies from "../../utils/logged-cookies";
import { ImpactStore } from "../../store/ImpactStore";

const LoginForm = () => {
  const {user, setUser} = useContext(ImpactStore);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const loginUser = () => {
    axios
      .post(
        "/login",
        {
          email,
          password,
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
        setPasswordError("");
        if (response.data.token) {
          setCookie("token", response.data.token);
          setCookie("zoneRole", response.data.zoneRole);
          setCookie("zoneRoleOn", response.data.zoneRoleOn);
          setCookie("countyId", response.data.countyId);
          setCookie("villageId", response.data.villageId);
          setCookie("localityId", response.data.localityId);
          setCookie("admin", response.data.admin);
          setUser(response.data);
          if (response.data.status == "IN_ASTEPTARE")
            navigate('/pending'); else navigate("/");

        } else if (response.data.errors) {
          if (response.data.errors.email)
            setEmailError(response.data.errors.email.details);
          if (response.data.errors.password)
            setPasswordError(response.data.errors.password.details);
        }
        // console.log(response.data.errors);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        // if(error.response.data.description.includes('email')) {
        //   setEmailError(error.response.data.description);
        //   setPasswordError("");
        // }
        // else {
        //   setEmailError("");
        //   setPasswordError(error.response.data.description);
        // }
      })
      .then(() => {
        // always executed
      });
  };

  return (
    <>
      <form action="submit" className="login-form">
        <img src={logoBlack} alt="logo" className="login-form__logo" />
        <h3 className="login-form__title">Logheaza-te pe Impact</h3>
        <div className="login-form__h-line"></div>
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
          className="button-default-form  submit-btn"
          onClick={loginUser}
        >
          Logheaza-te
        </button>
      </form>
    </>
  );
};

export default LoginForm;
