import "./LoginFormStyles.scss";

import { useState } from "react";
import axios from "../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
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
        password
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      // handle success
      if(response.data.token) {
        setCookie('token', response.data.token);
        navigate("/")
      }
      console.log(response);
    })
    .catch((error) => {
      // handle error
      console.log(error.response);
      if(error.response.data.description.includes('email')) {
        setEmailError(error.response.data.description);
        setPasswordError("");
      }
      else {
        setEmailError("");
        setPasswordError(error.response.data.description);
      }
    })
    .then(() => {
      // always executed
    });
  }

  return (
    <>
      <form action="submit" className="login-form">
        <h3 className="login-form__title">Logheaza-te pe Impact</h3>
        <div className="login-form__h-line"></div>
        <label htmlFor="email" className="label-default">
          Adresa de email 
        </label>
        <input type="text" className="input-default" name="email" onChange={e => setEmail(e.target.value)}/>
        <span className="error-default">{emailError}</span>
        <label htmlFor="parola" className="label-default">
          Parola
        </label>
        <input
          type="password"
          className="input-default"
          name="parola"
          placeholder="6+ caractere"
          onChange={e=>setPassword(e.target.value)}
        />
        <span className="error-default">{passwordError}</span>
        <button type="button" className="button-default-form  submit-btn" onClick={loginUser}>Logheaza-te</button>
      </form>
    </>
  );
};

export default LoginForm;
