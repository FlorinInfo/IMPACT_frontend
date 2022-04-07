import "./HomepageStyles.scss";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AddPost from "./../../components/HomePage/AddPost/AddPost";

const Homepage = () => {
  return (
    <div className="homepage">
      <NavigationBar />
      <div className="homepage__container">
        <div className="homepage__left">
          <AddPost />
        </div>
        <div className="homepage__right">xxx</div>
      </div>
    </div>
  );
};

export default Homepage;
