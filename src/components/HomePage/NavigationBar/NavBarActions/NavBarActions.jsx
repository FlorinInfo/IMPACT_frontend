import "./NavBarActionsStyles.scss";

// import Notifications from "@material-ui/icons/NotificationsNone";
// import Favorite from "@material-ui/icons/FavoriteBorder";
// import Add from "@material-ui/icons/Add";

import { IoIosNotificationsOutline } from "react-icons/io";
import { MdFavoriteBorder } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

const NavBarActions = () => {
  return (
    <div className="actionsContainer">
      {/* <Notifications className="action" /> */}
      <IoIosNotificationsOutline className="action" />
      <MdFavoriteBorder className="action" />
      <AiOutlinePlus className="action" />
    </div>
  );
};

export default NavBarActions;
