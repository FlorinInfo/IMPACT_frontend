import "./HomeStyles.scss";

import HomeIcon from "@material-ui/icons/Home";
import { RiArrowDropDownLine } from "react-icons/ri";

const userType = "administrator";

const Home = () => {
  return (
    <div>
      <button className="homeButton">
        <HomeIcon className="homeIcon" />
        <spam>
          <h1>Home</h1>
        </spam>
        {/* {userType === "administrator"} */}
        <RiArrowDropDownLine className="arrow" />
      </button>
    </div>
  );
};

export default Home;
