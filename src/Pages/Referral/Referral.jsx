import * as React from "react";
import "./ReferralStyles.scss";
import QrCode from "../../components/QrCode/QrCode";
import { ImpactStore } from "../../store/ImpactStore";
import { useContext, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Referral = () => {
  const { user, setUser } = useContext(ImpactStore);
  const [link, setLink] = useState(
    `${window.location.origin}/invite/${user.id}`
  );
  const [notification, setNotification] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    setNotification(true);
  };

  return (
    <div className="referral">
      <div className="referral__container">
          <h1 className="referral__title">
            Invita prieteni si primeste puncte bonus
          </h1>
          <h2 className="referral__subtitle">( Invita prieteni folosind codul QR sau link-ul de mai jos )</h2>
          {/* <div className="referral__options">
              <span className="referral__options-title">Ai 2 optiuni pentru a-ti invita prietenii:</span>
              <ol>
                  <li>Copiaza link-ul de mai jos si trimite-l unui prieten</li>
                  <li>Trimite QrCode-ul prietenului pentru a-l scana</li>
              </ol>
          </div> */}
          <div className="referral__link">
            <input
              type="text"
              readOnly
              className="input-default"
              value={link}
            />
            <button className="button-default-form" onClick={copyToClipboard}>
              Copiaza
            </button>
          </div>
          <div className="referral__qr">
            <QrCode link={link} />
          </div>
        </div>
      <Snackbar open={notification} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Link-ul a fost copiat cu succes
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Referral;
