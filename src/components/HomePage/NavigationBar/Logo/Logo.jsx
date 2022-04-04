import "./LogoStyles.scss";

import srcLogo from "../../../../assets/images/logo-left-image.svg";

const Logo = () => {
  return (
    <div className="logo">
      <img src={srcLogo} />
    </div>
  );
};

export default Logo;
