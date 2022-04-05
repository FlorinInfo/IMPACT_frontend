import "./NavBarActionsStyles.scss";

// import Notifications from "@material-ui/icons/NotificationsNone";
// import Favorite from "@material-ui/icons/FavoriteBorder";
// import Add from "@material-ui/icons/Add";

import { IoIosNotificationsOutline } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import { IoAddSharp } from "react-icons/io5"; 

const NavBarActions = () => {
  return (
    <div className="actionsContainer">
      {/* <Notifications className="action" /> */}
      <IoIosNotificationsOutline className="action" />
      <BsHeart className="action" />
      <IoAddSharp className="action" />
    </div>
  );
};

export default NavBarActions;
