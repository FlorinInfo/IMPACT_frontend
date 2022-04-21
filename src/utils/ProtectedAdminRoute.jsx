import {
	Navigate
} from 'react-router-dom';
import { ImpactStore } from "../store/ImpactStore";
import { useContext } from 'react';
import { Cookies, useCookies } from "react-cookie";

const rolesAllowed = [
	"MODERATOR",
	"ADMINISTRATOR"
]

const ProtectedAdminRoute = ({ children }) => {
	const {user, setUser} = useContext(ImpactStore);
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);
	if(cookies.token) {
		if(user.admin==true || rolesAllowed.includes(user.zoneRole)) return children;
		return <Navigate replace to="/" />;
      }
    return <Navigate replace to="/login" />;
};

export default ProtectedAdminRoute