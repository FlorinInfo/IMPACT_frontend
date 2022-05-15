import "./FPasswordStyles.scss"; 

import { useState, useContext, useEffect } from "react";
import axios from "../../assets/axios/axios";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlack from "../../assets/images/logo-black.svg";
import { useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import jwt_decode from "jwt-decode";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FPasswordForm = () => {
  let navigate = useNavigate();
  const { token } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatErr, setRepeatErr] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationText, setNotificationText] = useState("");

  const closeNotification = ()=> {
    setNotification(false);
    setNotificationText("");
  }



  const sendEmail = ()=> {
    axios
    .post(
      "/forgotPassword",
      {
        email
      },
      {
        headers: {
          accept: "application/json",
        },
      }
    )
    .then((response) => {
      // handle success
      if(response.data.errors) {
        if(response.data.errors.email) setEmailError(response.data.errors.email.details);
      }
      else {
        setEmail("");
        setEmailError("");
        setNotification(true);
        setNotificationText("Vei primi un email cu link-ul de resetare al parolei in cel mai scurt timp.")
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

  const changePassword = ()=> {
    const userId = jwt_decode(token).userId;
    if (password != repeatPassword) {setPasswordError("");setRepeatErr("Parolele nu coincid");}
    else
      axios
        .patch(
          `/users/${userId}`,
          {
            passwordToken: token,
            newPassword: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // handle success
          setPasswordError("");
          if(response.data.errors) {
            if(response.data.errors.newPassword) setPasswordError(response.data.errors.newPassword.details);else setPasswordError("");
          }
          else {
            setPassword("");
            setPasswordError("");
            setRepeatErr("");
            setRepeatPassword("");
            setNotification(true);
            setNotificationText("Parola a fost actualizate cu succes");
            setTimeout(()=>{
              navigate("/login");
            },2000)
          }
          // else {
          //   setErrNpass("");
          //   setErrOpass("");
          //   setRepeatErr("");
          //   setNewPassword("");
          //   setOpassword("");
          //   setRepeatPass("");
          //   setNotification(true);
          // }
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
    <>
    {
      !token ? <>
        <form action="submit" className="login-form">
        <img src={logoBlack} alt="logo" className="login-form__logo" />
        <h3 className="login-form__title">Ai uitat parola?</h3>
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
        <button
          type="button"
          className="button-default-form  submit-btn"
          onClick={sendEmail}
        >
          Trimite email
        </button>
      </form>
      </> : <>
        <form action="submit" className="login-form">
        <img src={logoBlack} alt="logo" className="login-form__logo" />
        <h3 className="login-form__title">Actualizare parola</h3>
        <div className="login-form__h-line"></div> 
        <label htmlFor="password" className="label-default">
          Parola
        </label>
        <input
          type="password"
          className="input-default"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="error-default">{passwordError}</span>  
        <label htmlFor="r-password" className="label-default">
          Repeta parola
        </label>
        <input
          type="password"
          className="input-default"
          name="r-password"
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
        <span className="error-default">{repeatErr}</span>     
        <button
          type="button"
          className="button-default-form  submit-btn"
          onClick={changePassword}
        >
          Schimba parola
        </button>
      </form>
      </>
    }
    <Snackbar open={notification} autoHideDuration={6000} onClose={closeNotification}>
        <Alert onClose={closeNotification} severity="success" sx={{ width: '100%' }}>
         {notificationText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FPasswordForm;
