import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ProfilePageStyles.scss";

import imgProfile from "./../../assets/images/default_profile_pic1.jpg";
import { ImpactStore } from "../../store/ImpactStore";
import axios from "./../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";

import SortPostsProfile from "../../components/SortPostsProfile/SortPostsProfile";
import { useState } from "react";
import rankPerform from "../../utils/rank";

const ProfilePage = () => {
  // const { user, setUser } = useContext(ImpactStore);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { id, filter } = useParams();
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState(
        {
          type: "Cetatean",
          color: "black",
          image: "default.jpg",
        }
  );


  // console.log(id, "fdgdfs");

  const fetchData = () => {
    axios
      .get(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        setUser(response.data);
        setRank(
          response.data.monthlyPoints >= 0
            ? () =>
                rankPerform(
                  response.data.monthlyPoints,
                  response.data.roleUser,
                  response.data.admin
                )
            : {
                type: "Cetatean",
                color: "black",
                image: "default.jpg",
              }
        );
      
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {});
  };

  const getPosts = () => {
    axios
      .get(`https://backend.imp-act.ml/articles?userId=&admin=&recent=&inProgress=&completed=&best=&offset&limit&cursor=&favorites=&upvoted&downvoted=&timespan=&q=`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        console.log(response);

      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const name

  return (
    <div className="profile-page">
      {user ? (
        <div className="profile-page__container">
          <div className="profile-page__left">
            <div className="profile-component">
              <img src={require(`../../assets/images/ranks/${rank.image}`)} className="profile-component__image" />
              <div className="profile-component__data">
                <div className="profile-component_characteristic">
                  <span className="profile-component__data__name">Nume:</span>
                  <span className="profile-component__data__value">
                    {` ${user.lastName}`}
                  </span>
                </div>
                <div className="profile-component_characteristic">
                  <span className="profile-component__data__name">
                    Prenume:
                  </span>
                  <span className="profile-component__data__value">
                    {` ${user.firstName}`}
                  </span>
                </div>
                <div className="profile-component_characteristic">
                  <span className="profile-component__data__name">Rank:</span>
                  <span className="profile-component__data__value"> {rank.type}</span>
                </div>
                <div className="profile-component_characteristic">
                  <span className="profile-component__data__name">
                    Puncte Rank:
                  </span>
                  <span className="profile-component__data__value"> {user.monthlyPoints}</span>
                </div>
              </div>
            </div>
            <SortPostsProfile />
          </div>
          <div className="profile-page__right"></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePage;
