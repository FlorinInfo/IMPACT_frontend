import "./HomepageStyles.scss";

import AddPost from "./../../components/HomePage/AddPost/AddPost";
import SortPosts from "../../components/HomePage/SortPosts/SortPosts";
import TopUsers from "../../components/HomePage/TopUsers/TopUsers";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
          <SortPosts />
        </div>
        <div className="homepage__right">
          <TopUsers />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
