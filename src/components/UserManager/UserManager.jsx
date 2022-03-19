import "./UserManager.scss";

import userProfile from "../../assets/images/admin-avatar.png"

const UserManager = ({cardType, fullName}) => {
    return (
        <div className="user-manager">
            <img src={userProfile} className="user-manager__avatar" alt="user-image" />
            <div className="user-manager__info">
                <span className="user-manager__name">Alex Frunza </span>
                &#8226;&nbsp;
                <span className="user-manager__rank">Cetatean responsabil</span>
            </div>
            <div className="user-manager__actions">
                {
                    cardType==1 ? <button >Verifica cetatean</button> : ""
                }
                                {
                    cardType==2 ? <button >Seteaza rol</button> : ""
                }
                                {
                    cardType==3 ? <button >Seteaza rol</button> : ""
                }
               
            </div>
        </div>
    )
}

export default UserManager;