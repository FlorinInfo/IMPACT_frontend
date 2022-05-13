import "./InviteStyles.scss"
import { useParams } from "react-router-dom";
// import { Cookies, useCookies } from "react-cookie";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Invite = ()=> {
    let navigate = useNavigate();
    // const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const { id } = useParams();
    useEffect(()=>{
        // setCookie("referralId", id, {path:"/"});
        localStorage.setItem("referralId", id);
        navigate("/signup")

    },[])
    return (
        <></>
    )
}

export default Invite;