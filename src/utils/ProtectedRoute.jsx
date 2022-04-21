import {
	Navigate
} from 'react-router-dom';
import { ImpactStore } from "../store/ImpactStore";
import { useContext } from 'react';
import { Cookies, useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
	const {user, setUser} = useContext(ImpactStore);
	const [cookies, setCookie, removeCookie] = useCookies(["token"]);

 
	if(cookies.token) {
        if(user.status == "IN_ASTEPTARE") return <Navigate replace to="/pending" />;
        return children;
      }
    return <Navigate replace to="/login" />;
};

export default ProtectedRoute;