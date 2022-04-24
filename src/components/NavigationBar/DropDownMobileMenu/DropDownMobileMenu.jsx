import React from "react";

import "./DropDownMobileMenuStyles.scss";

import DropDownMenuHome from "../DropDownMenuHome/DropDownMenuHome";
import DropDownMenuProfile from "../DropDownMenuProfile/DropDownMenuProfile";

const DropDownMobileMenu = () => {
  return (
    <div>
      <DropDownMenuHome />
      <DropDownMenuProfile />
    </div>
  );
};

export default DropDownMobileMenu;
