import React, { useState } from "react";

import "./UnderNavigationBarStyles.scss";

function UnderNavigationBarButton(props) {
  return (
    <button
      className={
        props.active
          ? "under-navigation-bar__button selected-unvb-b"
          : "under-navigation-bar__button"
      }
      id={props.id}
    >
      <a>{props.children}</a>
    </button>
  );
}

const UnderNavigationBar = () => {
  const [selectedButton, setSelectedButton] = useState("acasa");

  const handleSelectedButton = (e) => {
    e.preventDefault();
    setSelectedButton(e.target.closest(".under-navigation-bar__button").id);
  };

  return (
    <div className="under-navigation-bar" onClick={handleSelectedButton}>
      <UnderNavigationBarButton id="judet" active={"judet" === selectedButton}>
        <span className="under-navigation-bar__button__text">Judet</span>
      </UnderNavigationBarButton>
      <UnderNavigationBarButton id="acasa" active={"acasa" === selectedButton}>
        <span className="under-navigation-bar__button__text">Acasa</span>
      </UnderNavigationBarButton>
      <UnderNavigationBarButton
        id="comuna"
        active={"comuna" === selectedButton}
      >
        <span className="under-navigation-bar__button__text">Comuna</span>
      </UnderNavigationBarButton>
    </div>
  );
};

export default UnderNavigationBar;
