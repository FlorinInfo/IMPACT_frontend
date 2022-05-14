import "./UserSettingsStyles.scss";
import { useState } from "react";

const UserSettings = () => {
    const [opassword, setOpassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPass, setRepeatPass] = useState("");

    const [errOpass, setErrOpass] = useState("");
    const [errNpass, setErrNpass] = useState("");
    const [repeatErr, setRepeatErr] = useState("");

  return (
    <div className="user-sttings">
      <div className="user-settings__container">
        <h1 className="user-settings__title">Setari profil</h1>
        <div className="user-settings__pass-cnt">
          <h2 className="user-settings__subtitle">Modifica parola</h2>
          <div className="user-settings__input-cnt">
            <label htmlFor="password" className="label-default">
              Parola veche
            </label>
            <input
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
        >
          Actualizeaza parola
        </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
