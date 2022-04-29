import React from "react";

import "./PostOptionsStyles.scss";

import { MdOutlineDelete } from "react-icons/md";

const PostOptions = ({deletePost}) => {
  function OptionItem(props) {
    return (
      <a className="post-options__item" onClick={props.onClick}>
        <span>{props.leftIcon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className="post-options">
      <OptionItem
        onClick={deletePost}
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text" >Sterge Postare</span>
      </OptionItem>
      {/* <OptionItem
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text">Sterge Postare</span>
      </OptionItem>
      <OptionItem
        leftIcon={<MdOutlineDelete className="post-options__item__icon" />}
      >
        <span className="post-options__item__text">Sterge Postare</span>
      </OptionItem> */}
    </div>
  );
};

export default PostOptions;
