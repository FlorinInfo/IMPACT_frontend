import {
	Navigate
} from 'react-router-dom';
import { ImpactStore } from "../store/ImpactStore";
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
	const {user, setUser} = useContext(ImpactStore);

 
	if(localStorage.getItem("token")) {
        if(user.status == "IN_ASTEPTARE") return <Navigate replace to="/pending" />;
        return children;
      }
    return <Navigate replace to="/login" />;
};

export default ProtectedRoute;