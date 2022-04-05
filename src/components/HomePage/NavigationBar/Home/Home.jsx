import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiArrowDropDownLine } from "react-icons/ri";

const userType = "administrator";

const Home = () => {
  return (
    <div className="homeButton-container">
      <button className="homeButton">
        <HomeIcon className="homeIcon" />
        <span>
          <h1>Home</h1>
        </span>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="arrow" />
      </button>
    </div>
  );
};

export default Home;
