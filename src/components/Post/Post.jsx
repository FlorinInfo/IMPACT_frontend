import "./PostStyles.scss";
import { Link } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import profileImage from "../../assets/images/default_profile_pic1.jpg";
import { useEffect, useState } from "react";

import MediaSlider from "./MediaSlider/MediaSlider";

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

  return (
    <div className="post">
      {/* <video controls muted autoPlay>
                        <source src="https://backend.imp-act.ml/assets/videosArticles/7Oog2e1I_aOnSAr322I0U.mp4" type="video/mp4"></source>
                    </video> */}
      <div className="postvotes">
        <BiUpvote
          className={`postvotes-action postvotes-action--up ${
            true == true ? "postvotes-action--active-1" : ""
          }`}
        />
        <span className="postvotes-number">123</span>
        <BiDownvote className="postvotes-action postvotes-action--down" />
      </div>
      <div className="postmain">
        <div className="postauthor">
          <img src={profileImage} alt="" />
          <Link to="#" className="postauthor-name">
            {article.author.firstName} {article.author.lastName}
          </Link>
        </div>
        <span className="posttitle">{article.title}</span>
        <p className="postdescription">{article.description}</p>
        <div className="post__media">
          <MediaSlider media={article.articleGallery} />
        </div>
      </div>
    </div>
  );
};

export default Post;
