import React from "react";

import "./PostOptionsStyles.scss";

import { MdOutlineDelete } from "react-icons/md";

const PostOptions = () => {
  function OptionItem(props) {
    return (
      <a className="post-options__item">
        <span>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="post-options">
      <OptionItem
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text">Sterge Postare</span>
      </OptionItem>
      <OptionItem
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text">Sterge Postare</span>
      </OptionItem>
      <OptionItem
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text">Sterge Postare</span>
      </OptionItem>
    </div>
  );
};

export default PostOptions;
