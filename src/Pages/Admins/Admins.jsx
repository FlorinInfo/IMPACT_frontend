import UserManager from "../../components/UserManager/UserManager";
import "./AdminsStyles.scss";
import { nanoid } from "nanoid";

const users = [
  { id: nanoid(), fullName: "Florin Bucataru", action: 1 },
  { id: nanoid(), fullName: "Frunza Alexandru", action: 2 },
  { id: nanoid(), fullName: "Loghin Catalin", action: 3 },
  { id: nanoid(), fullName: "Florin Bucataru", action: 1 },
  { id: nanoid(), fullName: "Frunza Alexandru", action: 2 },
  { id: nanoid(), fullName: "Loghin Catalin", action: 3 },
];

const Admins = () => {
  return (
    <div className="create-admins">
      {users.map((user) => {
        return(
        <UserManager
            key={user.id}
          fullName={user.fullName}
          cardType={user.action}
        ></UserManager> )
      })}
    </div>
  );
};

export default Admins;
