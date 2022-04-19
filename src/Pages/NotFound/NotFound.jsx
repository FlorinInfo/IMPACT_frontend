import React from "react";

import "./NotFoundStyles.scss";

import imgError from "./../../assets/images/404error.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__message-error">
        <img className="not-found__message-error__img" src={imgError} />
        <h1 className="not-found__message-error__text">
          404 - Pagina nu a fost găsită!
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
