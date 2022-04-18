import "./HomepageStyles.scss";

import AddPost from "./../../components/HomePage/AddPost/AddPost";
import TopUsers from "../../components/HomePage/TopUsers/TopUsers";
import Post from "../../components/Post/Post";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
          <div className="homepage__posts">
            <div className="homepage__post"><Post /></div>
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
