import UserManager from "../../components/UserManager/UserManager";
import "./AdminsStyles.scss";
const y = 1111;

const Admins = () => {
    return (
        <div className="create-admins">
            <UserManager cardType={y}></UserManager>
        </div>
    )
}

export default Admins