import "./LogoStyles.scss";

import srcLogo from "../../../assets/images/logo-blackx.svg";
// schimbare
const Logo = () => {
  return (
    <div className="logo">
      <img className="logo--img" src={srcLogo} />
    </div>
  );
};

export default Logo;
