import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiArrowDropDownLine } from "react-icons/ri";

const userType = "administrator";

const Home = () => {
  return (
    <div className="homeButton-container">
      <button className="homeButton">
        <HomeIcon className="homeIcon" />
        <h1 className="homeicon--text">Home</h1>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="arrow" />
      </button>
    </div>
  );
};

export default Home;
