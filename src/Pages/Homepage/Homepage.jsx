import "./HomepageStyles.scss";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import AddPost from "./../../components/HomePage/AddPost/AddPost";

const Homepage = () => {
  return (
    <div className="container">
      <NavigationBar />
      <AddPost />
    </div>
  );
};

export default Homepage;
