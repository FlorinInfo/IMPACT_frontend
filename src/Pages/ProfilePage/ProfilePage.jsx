import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ProfilePageStyles.scss";

import imgProfile from "./../../assets/images/default_profile_pic1.jpg";
import { ImpactStore } from "../../store/ImpactStore";
import axios from "./../../assets/axios/axios";
import { Cookies, useCookies } from "react-cookie";

import SortPostsProfile from "../../components/SortPostsProfile/SortPostsProfile";

const ProfilePage = () => {
  const { user, setUser } = useContext(ImpactStore);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const { id, filter } = useParams();

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
      .get(`/users/${id}`, {
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

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        <div className="profile-page__left">
          <div className="profile-component">
            <img src={imgProfile} className="profile-component__image" />
            <div className="profile-component__data">
              <div className="profile-component_characteristic">
                <span className="profile-component__data__name">Nume:</span>
                <span className="profile-component__data__value">
                  {` ${user.lastName}`}
                </span>
              </div>
              <div className="profile-component_characteristic">
                <span className="profile-component__data__name">Prenume:</span>
                <span className="profile-component__data__value">
                  {` ${user.firstName}`}
                </span>
              </div>
              <div className="profile-component_characteristic">
                <span className="profile-component__data__name">Rank:</span>
                <span className="profile-component__data__value">{` rank`}</span>
              </div>
              <div className="profile-component_characteristic">
                <span className="profile-component__data__name">
                  Puncte Rank:
                </span>
                <span className="profile-component__data__value">{` 78`}</span>
              </div>
            </div>
          </div>
          <SortPostsProfile />
        </div>
        <div className="profile-page__right"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
