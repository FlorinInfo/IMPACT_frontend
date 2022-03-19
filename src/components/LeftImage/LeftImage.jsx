import "./LeftImageStyles.scss";

import logoLeft from "../../assets/images/logo-left-image.svg"

const LeftImage = () => {
  return (
    <div className="left-image">
      <header className="left-image__header">
        <h2>
          <q>Schimbarea in lume incepe cu tine</q>
        </h2>
      </header>
      <div className="left-image__cnt"></div>
      <img src={logoLeft} alt="logo" className="left-image__logo" />
    </div>
  );
};

export default LeftImage;
