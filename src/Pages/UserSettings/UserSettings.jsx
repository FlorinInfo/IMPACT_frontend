import "./UserSettingsStyles.scss";
import { useState, useContext } from "react";
import { ImpactStore } from "../../store/ImpactStore";
import axios from "../../assets/axios/axios";
import * as React from "react"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserSettings = () => {
  const [notification, setNotification] = useState(false);
  const [opassword, setOpassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const [errOpass, setErrOpass] = useState("");
  const [errNpass, setErrNpass] = useState("");
  const [repeatErr, setRepeatErr] = useState("");

  const { user, setUser } = useContext(ImpactStore);

  const updatePassword = () => {
    if (newPassword != repeatPass) {setErrNpass("");;setRepeatErr("Parolele nu coincid");}
    else
      axios
        .patch(
          `/users/${user.id}`,
          {
            oldPassword: opassword,
            newPassword: newPassword,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          // handle success
          setRepeatErr("");
          console.log(response);
          if(response.data.errors) {
            if(response.data.errors.oldPassword) setErrOpass(response.data.errors.oldPassword.details);else setErrOpass("");
            if(response.data.errors.newPassword) setErrNpass(response.data.errors.newPassword.details);else setErrNpass("");
          }
          else {
            setErrNpass("");
            setErrOpass("");
            setRepeatErr("");
            setNewPassword("");
            setOpassword("");
            setRepeatPass("");
            setNotification(true);
          }
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
    <div className="user-settings">
      <div className="user-settings__container">
        <h1 className="user-settings__title">Setari profil</h1>
        <div className="user-settings__pass-cnt">
          <h2 className="user-settings__subtitle">Modifica parola</h2>
          <div className="user-settings__input-cnt">
            <label htmlFor="password" className="label-default">
              Parola veche
            </label>
            <input
            value={opassword}
              type="password"
              className="input-default"
              name="password"
              onChange={(e) => setOpassword(e.target.value)}
            />
            <span className="error-default">{errOpass}</span>
          </div>
          <div className="user-settings__input-cnt">
            <label htmlFor="new-password" className="label-default">
              Parola noua
            </label>
            <input
              value={newPassword}
              type="password"
              className="input-default"
              name="new-password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="error-default">{errNpass}</span>
          </div>
          <div className="user-settings__input-cnt">
            <label htmlFor="repeat-password" className="label-default">
              Repeta parola noua
            </label>
            <input
              value={repeatPass}
              type="password"
              className="input-default"
              name="repeat-password"
              onChange={(e) => setRepeatPass(e.target.value)}
            />
            <span className="error-default">{repeatErr}</span>
          </div>
          <button
            type="button"
            className="button-default-form submit-btn user-settings__btn"
            onClick={updatePassword}
          >
            Actualizeaza parola
          </button>
        </div>
      </div>
      <Snackbar open={notification} autoHideDuration={1500} onClose={()=>setNotification(false)}>
        <Alert onClose={()=>setNotification(false)} severity="success" sx={{ width: '100%' }}>
          Parola a fost actualizata cu succes!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserSettings;
