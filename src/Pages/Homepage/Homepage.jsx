import "./HomepageStyles.scss";

import AddPost from "./../../components/HomePage/AddPost/AddPost";
import SortPosts from "../../components/HomePage/SortPosts/SortPosts";
import TopUsers from "../../components/HomePage/TopUsers/TopUsers";
import Post from "../../components/Post/Post";
import FeedSelect from "../../components/HomePage/FeedSelect/FeedSelect";

import { useEffect, useState, useContext } from "react";
import axios from "../../assets/axios/axios.js";
import { Cookies, useCookies } from "react-cookie";
import { ImpactStore } from "../../store/ImpactStore";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";


const Homepage = () => {
  const location = useLocation();
  const defaultFilter = (filterType) => {
    if (routeFilter != undefined) {
      let filterSplit = routeFilter.split("&").reverse();
      if (filterType == "zone") {
        for (const el of filterSplit) {
          let elSplit = el.split("=");
          if (elSplit[0] == "localityId")
            return { type: elSplit[0], id: elSplit[1] };
          if (elSplit[0] == "villageId")
            return { type: elSplit[0], id: elSplit[1] };
          if (elSplit[0] == "countyId")
            return { type: elSplit[0], id: elSplit[1] };
          // console.log({[elSplit[0]]:elSplit[1]})
        }
      }
      if (filterType == "filter") {
        for (const el of filterSplit) {
          let elSplit = el.split("=");
          if (elSplit[0] == "filter") return elSplit[1];
          // console.log({[elSplit[0]]:elSplit[1]})
        }
        return "recent";
      }
    } else {
      if (filterType == "zone")
        return {
          type: user.localityId ? "localityId" : "villageId",
          id: user.localityId ? user.localityId : user.villageId,
        };
      if (filterType == "filter") return "recent";
    }
  };

  let navigate = useNavigate();
  let { routeFilter } = useParams();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(1);
  const { user, setUser } = useContext(ImpactStore);
  const [posts, setPosts] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [zone, setZone] = useState(() => defaultFilter("zone"));
  const [filter, setFilter] = useState(() => defaultFilter("filter"));
  const fetchData = () => {
    axios
      .get(
        `/articles?${zone.type}=${zone.id}&${filter}=true&offset=${
          page * 10
        }&limit=10&cursor=`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      .then((response) => {
        // handle success
        if(response.data.errors) navigate("/");
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

  // useEffect(()=>{
  //   setZone(defaultFilter("zone"));
  //   setFilter(defaultFilter("filter"));
  //   // setPosts([]);
  //   // setPage(0);
  //   fetchData();
  // },[location])

  const changeFeed = (filter) => {
    let newParams = "";
    if (routeFilter) {
      let filterSplit = routeFilter.split("&").reverse();
      for (const el of filterSplit) {
        let elSplit = el.split("=");
        if (elSplit[0] != "filter")
          newParams = elSplit[0] + "=" + elSplit[1] + "&" + newParams;
        // console.log({[elSplit[0]]:elSplit[1]})
      }
    } else {
      if (user.localityId) newParams = "localityId=" + user.localityId + "&";
      else newParams = "villageId=" + user.villageId + "&";
    }
    // alert(newParams);
    navigate("/" + newParams + "filter=" + filter);
    // if (routeFilter == undefined) {
    //   navigate(`/${zone.type}-${zone.id}-${filter}`);
    // } else {
    //   let filterSplit = routeFilter.split("-");
    //   navigate(`/${filterSplit[0]}-${filterSplit[1]}-${filter}`);
    //   console.log(filterSplit);
    // }
  };

  const updateArticle = (articleId) => {
    axios
      .get(`/articles/${articleId}`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((response) => {
        // handle success
        let index = posts.findIndex((el) => el.id == articleId);
        let newPosts = [...posts];
        newPosts[index] = response.data;
        setPosts(newPosts);
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

  const deleteArticle = (articleId) => {
    setPosts(posts.filter((p) => p.id != articleId));
  };

  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
          <SortPosts selectedSort={filter} emitSort={changeFeed} />
          {/* {posts.length} */}
          {posts.length!=0 ? (
            <InfiniteScroll
              dataLength={posts.length} //This is important field to render the next data
              next={() => setPage(page + 1)}
              hasMore={true}
              loader={
                posts.length == limit ? (
                  <h4 className="scroll-text">Ai vazut toate postarile</h4>
                ) : (
                  <h4 className="scroll-text">Loading...</h4>
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
            <h4 className="scroll-text">Loading...</h4>
          )}
        </div>
        <div className="homepage__right">
          <FeedSelect />
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
