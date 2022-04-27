import "./HomepageStyles.scss";

import AddPost from "./../../components/HomePage/AddPost/AddPost";
import SortPosts from "../../components/HomePage/SortPosts/SortPosts";
import TopUsers from "../../components/HomePage/TopUsers/TopUsers";
import Post from "../../components/Post/Post";

import { useEffect, useState, useContext } from "react";
import axios from "../../assets/axios/axios.js";
import { Cookies, useCookies } from "react-cookie";
import { ImpactStore } from "../../store/ImpactStore";

const Homepage = () => {
  const { user, setUser } = useContext(ImpactStore);
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [zone, setZone] = useState({
    type: user.localityId ? "localityId" : "villageId",
    id: user.localityId ? user.localityId : user.villageId,
  });
  const [filter, setFilter] = useState(user.admin ? "admin" : "recent");
  useEffect(() => {
    axios
      .get(
        `/articles?${zone.type}=${zone.id}&${filter}=true&offset=0&limit=10&cursor=`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((response) => {
        // handle success
        console.log(response);
        setPosts(response.data.articles);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }, []);

  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
          <SortPosts />
          <div className="homepage__posts">
            {posts.map((article) => (
              <div key={article.id} className="homepage__post">
                <Post article={article} />{" "}
              </div>
            ))}
          </div>
        </div>
        <div className="homepage__right">
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
