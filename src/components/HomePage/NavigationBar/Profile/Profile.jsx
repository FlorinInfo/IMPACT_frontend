import "./ProfileStyle.scss";

import Person from "@material-ui/icons/Person";
import ArrowDropDown from "@material-ui/icons/ArrowDropDown";

const username = "username";

const Profile = () => {
  return (
    <div className="profile">
      <Person className="person" />
      <h1 className="username">{username}</h1>
      <ArrowDropDown />
    </div>
  );
};

export default Profile;
