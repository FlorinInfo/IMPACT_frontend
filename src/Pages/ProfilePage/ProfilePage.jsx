import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ProfilePageStyles.scss";

import imgProfile from "./../../assets/images/default_profile_pic1.jpg";
import { ImpactStore } from "../../store/ImpactStore";
import axios from "./../../assets/axios/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useLocation } from "react-router-dom";

import SortPostsProfile from "../../components/SortPostsProfile/SortPostsProfile";
import { useState } from "react";
import rankPerform from "../../utils/rank";
import Post from "../../components/Post/Post";

const ProfilePage = () => {
  // const { user, setUser } = useContext(ImpactStore);
  let navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { id, filter } = useParams();
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState({
    type: "Cetatean",
    color: "black",
    image: "default.jpg",
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios
      .get(`/users/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // handle success
        if (response.data.errors) navigate("/");
        setUser(response.data);
        setRank(
          response.data.monthlyPoints >= 0
            ? () =>
                rankPerform(
                  response.data.monthlyPoints,
                  response.data.zoneRole,
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
    // alert(filter)
    setLoader(true);
    axios
      .get(
        `/articles?userId=${id}&${filter ? filter + "=true" : ``}&offset=${
          page * 10
        }&limit=10&cursor=`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(async (response) => {
        // handle success
        console.log("aaaaaaaaaaaaaaaaaaaaA", response);
        if (response.data.errors) navigate("/");

        // console.log(response);

        // Removing dublicates
        // verifyArray = verifyArray.filter(
        //   (value, index, self) =>
        //     index ===
        //     self.findIndex(
        //       (t) => t.id === value.id
        //     )
        // );
        //
        setLoader(false);
        setLimit(response.data.limit);
        setPosts([...posts, ...response.data.articles]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
    getPosts();
  }, []);

  useEffect(() => {
    getPosts();
    // getTop();
  }, [page]);

  const updateArticle = (articleId) => {
    axios
      .get(`/articles/${articleId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // handle success
        let index = posts.findIndex((el) => el.id == articleId);
        let newPosts = [...posts];
        newPosts[index] = response.data;
        setPosts(newPosts);
        // getTop();
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteArticle = (articleId) => {
    setPosts(posts.filter((p) => p.id != articleId));
  };


  return (
    <div className="profile-page">
      {user ? (
        <div className="profile-page__container">
          <div className="profile-page__left">
            <div className="profile-component">
              <img
                src={require(`../../assets/images/ranks/${rank.image}`)}
                className="profile-component__image"
              />
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
                  <span className="profile-component__data__value">
                    {" "}
                    {rank.type}
                  </span>
                </div>
                <div className="profile-component_characteristic">
                  <span className="profile-component__data__name">
                    Puncte Rank:
                  </span>
                  <span className="profile-component__data__value">
                    {" "}
                    {user.monthlyPoints}
                  </span>
                </div>
              </div>
            </div>
            <SortPostsProfile activeFilter={filter} />
            {/* {posts.length} */}
            {posts.length != 0 ? (
              <InfiniteScroll
                dataLength={posts.length} //This is important field to render the next data
                next={() => setPage(page + 1)}
                hasMore={true}
                loader={
                  posts.length == limit ? (
                    <h4 className="scroll-text">Ai vazut toate postarile</h4>
                  ) : (
                    <h4 className="scroll-text">Se incarca...</h4>
                  )
                }
              >
                <div className="homepage__posts">
                  {posts.map((article) => (
                    <div key={article.id} className="homepage__post">
                      {/* Judet : {article.countyId ? article.countyId : ""}
                    <br />
                    Oras/comuna : {article.villageId ? article.villageId : ""}
                    <br />
                    Localitate : {article.localityId ? article.localityId : ""} */}
                      <Post
                        deleteArticle={deleteArticle}
                        updateArticle={updateArticle}
                        article={article}
                      />{" "}
                    </div>
                  ))}
                </div>
              </InfiniteScroll>
            ) : (
              <h4 className="scroll-text">{loader==false&&posts.length == 0 ? "Nu exista postari" : ""}</h4>
            )}
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
