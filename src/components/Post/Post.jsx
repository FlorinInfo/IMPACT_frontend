import "./PostStyles.scss";
import { Link } from "react-router-dom";
import profileImage from "../../assets/images/default_profile_pic1.jpg";
import { useEffect, useState } from "react";

import MediaSlider from "./MediaSlider/MediaSlider";
import PostOptions from "./PostOptions/PostOptions";

import { BiDownvote, BiUpvote } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import { MdOutlineFavorite } from "react-icons/md";
import { MdMoreHoriz } from "react-icons/md";

import testImage from "../../assets/images/dwipm_18.png";
import testImage2 from "../../assets/images/buletine-840x500.jpg";
import axios from "../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";
const testMedia = [
  // profileImage,
  testImage,
  testImage2,
];

const Post = ({ article }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [favorite, setFavorite] = useState(false);
  const [showPostOptions, setShowOptions] = useState(false);

  const handleFavorite = () => {
    favorite ? setFavorite(false) : setFavorite(true);
  };

  const handleShowOptions = () => {
    showPostOptions ? setShowOptions(false) : setShowOptions(true);
  };

  return (
    <div className="post">
      {/* <video controls muted autoPlay>
                        <source src="https://backend.imp-act.ml/assets/videosArticles/7Oog2e1I_aOnSAr322I0U.mp4" type="video/mp4"></source>
                    </video> */}
      <div className="post__votes">
        <BiUpvote
          className={`post__votes-action post__votes-action--up ${
            true == true ? "postvotes-action--active-1" : ""
          }`}
        />
        <span className="post__votes-number">{article.votePoints}</span>
        <BiDownvote className="post__votes-action post__votes-action--down" />
      </div>
      <div className="post__main">
        <div className="post__author">
          <img src={profileImage} alt="" />
          <Link to="#" className="post__author-name">
            {article.author.firstName} {article.author.lastName}
          </Link>
        </div>
        <span className="post__title">{article.title}</span>
        <p className="post__description">{article.description}</p>
        <div className="post__media">
          <MediaSlider media={article.articleGallery} />
        </div>
        <div className="post__actions">
          <button className="post__actions__button">
            <VscComment className="post__actions__button__icon" />
            <span className="post__actions__button__text">75 Comentarii</span>
          </button>
          <button className="post__actions__button" onClick={handleFavorite}>
            <MdOutlineFavorite
              className={`post__actions__button__icon ${
                favorite && "favorite"
              }`}
            />
            <span
              className={`post__actions__button__text ${
                favorite && "favorite"
              }`}
            >
              Favorite
            </span>
          </button>
          <button className="post__actions__button" onClick={handleShowOptions}>
            <MdMoreHoriz className="post__actions__button__icon" />
          </button>
          {showPostOptions && <PostOptions />}
        </div>
      </div>
    </div>
  );
};

export default Post;
