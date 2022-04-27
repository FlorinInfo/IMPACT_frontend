import "./HomepageStyles.scss";

import AddPost from "./../../components/HomePage/AddPost/AddPost";
import SortPosts from "../../components/HomePage/SortPosts/SortPosts";
import TopUsers from "../../components/HomePage/TopUsers/TopUsers";
import Post from "../../components/Post/Post";

import { useEffect, useState, useContext } from "react";
import axios from "../../assets/axios/axios.js";
import { Cookies, useCookies } from "react-cookie";
import { ImpactStore } from "../../store/ImpactStore";
import InfiniteScroll from "react-infinite-scroll-component";

const Homepage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);
  const { user, setUser } = useContext(ImpactStore);
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [zone, setZone] = useState({
    type: user.localityId ? "localityId" : "villageId",
    id: user.localityId ? user.localityId : user.villageId,
  });
  const [filter, setFilter] = useState(user.admin ? "admin" : "recent");
  const fetchData = () => {
    axios
      .get(
        `/articles?${zone.type}=${zone.id}&${filter}=true&offset=${page * 10}&limit=10&cursor=`,
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
  }, [page]);

  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
          <SortPosts />
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={()=>setPage(page+1)}
            hasMore={true}
            loader={posts.length==limit ? <h4 className="scroll-text">Ai vazut toate postarile</h4> : <h4 className="scroll-text">Loading...</h4>}
          >
            <div className="homepage__posts">
              {posts.map((article) => (
                <div key={article.id} className="homepage__post">
                  <Post article={article} />{" "}
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
        <div className="homepage__right">
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
